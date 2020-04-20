require("dotenv").config({
  path: `.env`,
})

const axios = require('axios');
const _ = require("lodash");

const NODE_TYPE = `DvidsImage`;

// For Debugging / dev buids
const debug = process.env.DEV_DEBUG ? process.env.DEV_DEBUG : false;
const max_results = 5; // No more than 50

const fetchImageList = (pageNum, unit, key) => axios.get(`https://api.dvidshub.net/search?unit=${unit}&type=image&page=${pageNum}&api_key=${key}&max_results=${max_results}`);

const fetchPRList = (pageNum, unit, key) => axios.get(`https://api.dvidshub.net/search?unit=${unit}&type=news&category="Press Release"&page=${pageNum}&api_key=${key}&max_results=${max_results}`);

const fetchAsset = (assetId, key) => axios.get(`https://api.dvidshub.net/asset?id=${assetId}&api_key=${key}&thumb_width=1200&thumb_quality=80`).catch(function (error) {
  console.log ('>>> Error During DVIDS Asset fetching of id ' + assetId);
  // if (error.response) {
  //   // The request was made and the server responded with a status code
  //   // that falls out of the range of 2xx
  //   console.log(error.response.data);
  //   console.log(error.response.status);
  //   //console.log(error.response.headers);
  // } else if (error.request) {
  //   // The request was made but no response was received
  //   // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
  //   // http.ClientRequest in node.js
  //   console.log(error.request);
  // } else {
  //   // Something happened in setting up the request that triggered an Error
  //   console.log('Error', error.message);
  // }
  // console.log(error.config);
});

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
	 *   https://github.com/gatsbyjs/gatsby/issues/10482
	 */

  console.log('Starting Images List Pull');
	let allImages = [];
	let pageNum = 1;
	let resultsProcessed = 0;

	let imageList = await fetchImageList(pageNum, unit, key);
	let resultCount = imageList.data.page_info.total_results;

	// save all of the image IDs from the first page
	allImages = extractIDs(imageList.data.results, allImages);
	resultsProcessed = allImages.length;

  // Check if we need more pages
  if (!debug) {
    while (resultCount > resultsProcessed){
      pageNum++;
      imageList = await fetchImageList(pageNum, unit, key);
      allImages = extractIDs(imageList.data.results, allImages);
      resultsProcessed = allImages.length;
    }
  }
  console.log("NRL Images to load: ", resultsProcessed);

  console.log('Starting PR List Pull');
  // Now fetch a list of all Press Releases.
  pageNum = 1;
  resultsProcessed = 0;
  let allPRs = [];

  let prList = await fetchPRList(pageNum, unit, key);
  resultCount = prList.data.page_info.total_results;

  // save all of the PR IDs from the first page
  allPRs = extractIDs(prList.data.results, allPRs);
  resultsProcessed = allPRs.length;
  if (!debug) {
    while (resultCount > resultsProcessed){
      pageNum++;
      prList = await fetchPRList(pageNum, unit, key);
      allPRs = extractIDs(prList.data.results, allPRs);
      resultsProcessed = allPRs.length;
    }
  }

  // Loop through the nodes and load all of the individual content.
  let allPressReleaseData = [];
  console.log('Starting individual PR Pulls');
  for (var i=0; i < allPRs.length; i++) {
    apiResponse = await fetchAsset(allPRs[i], key);
    // console.log('**************************');
    // console.log(apiResponse.data.results.id + " > ");
    if (apiResponse.data.results.related_media !== undefined){
      // console.log(apiResponse.data.results.related_media);
      allPressReleaseData.push(apiResponse.data.results);
    }
    else {
      console.log(">>> No Media Assets found on " + allPRs[i] + ' <<<');
    }
  }
  // console.log('Individual PR Pulls complete');

  // Add the PR Images to the array of images we loaded above
  for (var i=0; i < allPressReleaseData.length; i++) {
    apiData = allPressReleaseData[i];
    if (apiData.related_media.images) {
      apiData.related_media.images.map((image, i) => {
        let ImageIdIndex = _.findIndex(allImages, function(o) { return o.image_id == image.id; });
        if (ImageIdIndex < 0){
          allImages.push(image.id);
        }
      })
    }
  }

  // Remove any dupes
  allImages = _.uniq(allImages);
  resultsProcessed = allImages.length;
  console.log('Starting image loading for ' + allImages.length + ' images...');

  // Now we load & make a node for each image
  let totalCreated = 0;
	for (var i=0; i < allImages.length; i++) {
    // console.log('Fetching Asset: ', allImages[i]);
    imageResponse = await fetchAsset(allImages[i], key);
    if (imageResponse !== undefined){
      imageData = imageResponse.data.results;
      const nodeData = {
        dvids_id: imageData.id,
        title: imageData.title,
        description: imageData.description,
        keywords: imageData.keywords,
        date_published: imageData.date_published,
        date: imageData.date,
        unit_name: imageData.unit_name,
        branch: imageData.branch,
        timestamp: imageData.timestamp,
        image_url: imageData.thumbnail,
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
      // console.log(imageData.id + ' Created.');
      totalCreated ++;
      // console.log("Images completed: " + totalCreated);
    }
    else {
      console.log(allImages[i] + ' Skipped.');
    }
	}
  console.log("DVIDS Images: " + resultsProcessed + " Processed | " + totalCreated + " created.");
}
