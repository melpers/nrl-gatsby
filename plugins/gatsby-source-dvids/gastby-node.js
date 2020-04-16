const axios = require('axios');

const IMAGE_NODE_TYPE = `DvidsImage`;

const fetchImageList = (pageNum, unit, key) => axios.get(`https://api.dvidshub.net/search?unit=${unit}&type=image&page=${pageNum}&api_key=${key}`);
const fetchPRList = (pageNum, unit, key) => axios.get(`https://api.dvidshub.net/search?unit=${unit}&type=news&category="Press Release"&page=${pageNum}&api_key=${key}&max_results=10`);

const fetchAsset = (assetId, key) => axios.get(`https://api.dvidshub.net/asset?id=${assetId}&api_key=${key}`);

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
   * https://github.com/gatsbyjs/gatsby/issues/10482
   */

  let allImages = [];
  let pageNum = 1;
  let resultsProcessed = 0;

  let imageList = await fetchImageList(pageNum, "image", unit, key);
  let resultCount = imageList.data.page_info.total_results;

  // save all of the image IDs from the first page
  allImages = extractIDs(imageList.data.results, allImages);
  resultsProcessed = allImages.length;

  // Check if we need more pages
  while (resultCount > resultsProcessed){
    pageNum++;
    imageList = await fetchImageList(pageNum, unit, key);
    allImages = extractIDs(imageList.data.results, allImages);
    resultsProcessed = allImages.length;
  }

  // Now fetch a list of all Press Releases.
  pageNum = 1;
  resultsProcessed = 0;
  let allPRs = [];

  let prList = await fetchPRList(pageNum, unit, key);
  resultCount = prList.data.page_info.total_results;

  // save all of the PR IDs from the first page
  allPRs = extractIDs(imageList.data.results, allImages);
  resultsProcessed = allImages.length;
  // while (resultCount > resultsProcessed){
  //   pageNum++;
  //   prList = await fetchPRList(pageNum, unit, key);
  //   allPRs = extractIDs(prList.data.results, allPRs);
  //   resultsProcessed = allPRs.length;
  // }

  // Loop through the nodes and load all of the individual content.
  // We do this first b/c we need to go through it twice to be sure all
  // associated images are downloaded & nodes created before we assign
  // images to the nodes & choose the preview image.
  let allPressReleaseData = [];
  for (var i=0; i < allPRs.length; i++) {
    apiResponse = await fetchPressRelease(allPRs[i], key);
    allPressReleaseData.push(apiResponse.data.results);
  }

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
  console.log('allImages length: ' + allImages.length);

  // Now we load & make a node for each image
  for (var i=0; i < allImages.length; i++) {
    imageResponse = await fetchAsset(allImages[i], key);
    imageData = imageResponse.data.results;
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
        type: IMAGE_NODE_TYPE,
        content: JSON.stringify(imageData),
        contentDigest: createContentDigest(imageData),
      },
    }
    createNode(nodeData);
  }
  console.log("Processed " + resultsProcessed + " DVIDS NRL Images.");
}
