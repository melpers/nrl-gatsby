const axios = require('axios');

const NODE_TYPE = `DvidsImage`;

const fetchList = (pageNum, unit, key) => axios.get(`https://api.dvidshub.net/search?unit=${unit}&type=image&page=${pageNum}&api_key=${key}`);

const fetchImage = (imageId, key) => axios.get(`https://api.dvidshub.net/asset?id=${imageId}&api_key=${key}`);

const extractIDs = (data, idList) => {
	data.map((imgData, i) => {
		idList.push(imgData.id);
	})
	return idList;
}

exports.sourceNodes = async (
		{ actions, createNodeId, createContentDigest },
		pluginOptions
	) => {
	const { createNode } = actions;
	const key = pluginOptions.key;
	const unit = pluginOptions.unit;

	/*
	 * Fetch a list of all NRL images from DVIDS.
	 * Results are limited to 50 per page from the API, so we will need to load multiple pages 
	 * and store all of the image IDs that we eventually want to store for possible use.
	 * 
	 * If this issue is ever resolved this loading of all images should not be needed:
	 *     https://github.com/gatsbyjs/gatsby/issues/10482
	 */

	let allImages = [];
	let pageNum = 1;
	let resultsProcessed = 0;

	let imageList = await fetchList(pageNum, unit, key);
	const resultCount = imageList.data.page_info.total_results;
	
	// save all of the image IDs from the first page
	allImages = extractIDs(imageList.data.results, allImages);
	resultsProcessed = allImages.length;

	// Check if we need more pages
	while (resultCount > resultsProcessed){
		pageNum++;
		imageList = await fetchList(pageNum, unit, key);
		allImages = extractIDs(imageList.data.results, allImages);
		resultsProcessed = allImages.length;
	}

	// Now we load & make a node for each image
	for (var i=0; i < allImages.length; i++) {
		imageResponse = await fetchImage(allImages[i], key);
		imageData = imageResponse.data.results;
		//console.log(imageData);
		console.log(imageData.id);
		const nodeData = {
			image_id: imageData.id,
			title: imageData.title,
			description: imageData.description,
			keywords: imageData.keywords,
			date_published: imageData.date_published,
			date: imageData.date,
			unit_name: imageData.unit_name,
			branch: imageData.branch,
			timestamp: imageData.timestamp,
			image_url: imageData.image,
			url: imageData.url,
			location_city: imageData.location.city,
			location_state: imageData.location.state,
			location_country: imageData.location.country,
			location_country_abbreviation: imageData.location.country_abbreviation,
			dimensions_width: imageData.dimensions.width,
			dimensions_height: imageData.dimensions.height,
			virin: imageData.virin,

			id: createNodeId(`dvids-image-${imageData.id}`),
			parent: null,
			children: [],
			internal: {
				type: NODE_TYPE,
				content: JSON.stringify(imageData),
				contentDigest: createContentDigest(imageData),
			},
		}
		createNode(nodeData);
	}

}
