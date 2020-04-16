const axios = require('axios');
const _ = require("lodash");

const NODE_TYPE = `DvidsPressReleases`;

// For Debugging / dev buids
const debug = true;
const max_results = 5; // No more than 50

const fetchList = (pageNum, unit, key) => axios.get(`https://api.dvidshub.net/search?unit=${unit}&type=news&category="Press Release"&page=${pageNum}&api_key=${key}&max_results=${max_results}`);

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
  data.map((data, i) => {
    idList.push(data.id);
  })
  return idList;
}

exports.sourceNodes = async (
    { actions, createNodeId, createContentDigest, getNodesByType },
    pluginOptions
  ) => {
  const { createNode } = actions;
  const key = pluginOptions.key;
  const unit = pluginOptions.unit;

  // Load all of the DVIDS images we have, so we can reference them on the press releases.
  const dvidsImageNodes = getNodesByType(`DvidsImage`);

  /*
   * Fetch a list of all NRL Press Releadses from DVIDS search API.
   * Results are limited to 50 per page from the API, so we will need to load multiple pages 
   * and store all of the IDs so we can then fetch all of the complete article data.
   */

  let allNodes = [];
  let pageNum = 1;
  let resultsProcessed = 0;
  let totalCreated = 0;

  let PressReleaseList = await fetchList(pageNum, unit, key);
  const resultCount = PressReleaseList.data.page_info.total_results;
  
  // save all of the image IDs from the first page
  allNodes = extractIDs(PressReleaseList.data.results, allNodes);
  resultsProcessed = allNodes.length;

  // Check if we need more pages
  if (!debug) {
    while (resultCount > resultsProcessed){
      pageNum++;
      PressReleaseList = await fetchList(pageNum, unit, key);
      allNodes = extractIDs(PressReleaseList.data.results, allNodes);
      resultsProcessed = allNodes.length;
    }
  }

  // Now we load & make a node for each press release
  let imageError;
  for (var i=0; i < allNodes.length; i++) {
    apiResponse = await fetchAsset(allNodes[i], key);
    apiData = apiResponse.data.results;
    //console.log(apiData.id);

    // Not all articles have author information. This converts the 
    // "Courtesy" string into an array like the attributed entries.
    // We also create a formatted sting for use down the road.
    let formatted_credit = ""
    if (apiData.credit === "Courtesy") {
      apiData.credit = [{
        id: 0,
        name: 'Courtesy Story',
        rank: '',
        url: ''
      }];
      formatted_credit = "Courtesy Story";
    }
    else {
      authorCount = 1;
      apiData.credit.map((author, i) => {
        if (authorCount < 2) {
          formatted_credit = "Story By: " + author.name;
        }
        else {
          formatted_credit += " and " + author.name;
        }
        authorCount++;
      })
    }

    // Find the primary image and save it as the teaser &
    // add all of the image IDs to a filter for use later.
    let teaser_image_id = "";
    let all_image_ids = [];
    imageError = false;
    if (apiData.related_media && apiData.related_media.images) {
      apiData.related_media.images.map((image, i) => {
        let dvidsImageNodeIndex = _.findIndex(dvidsImageNodes, function(o) { return o.dvids_id == image.id; });
        // console.log('dvidsImageNodeIndex: ' + dvidsImageNodeIndex);
        if (dvidsImageNodeIndex >= 0) {
          all_image_ids[i] = dvidsImageNodes[dvidsImageNodeIndex].id;
          if (image.primary) {
            teaser_image_id = dvidsImageNodes[dvidsImageNodeIndex].id;
          }
        }
        else {
          console.log(">>> There was an error associating " + image.id + " with press release " + apiData.id + ' <<<');
          imageError = true;
        }
      })
      // If there was no Priamry image, fallback to the first one.
      if (teaser_image_id == "" && imageError !== true ) {
        teaser_image_id = dvidsImageNodes[_.findIndex(dvidsImageNodes, function(o) { return o.dvids_id == all_image_ids[0]; })].id;
      }
    }
    else {
      console.log ('>>> No Image ID found on ' + apiData.id + ' <<<');
    }
    if (imageError !== true ) {

      // Source in any video data in the related media
      let video_data = [];
      let video_response, videoInfo;
      if (apiData.related_media && apiData.related_media.video){
        videoInfo = apiData.related_media.video;
        for (var j=0; j < videoInfo.length; j++) {
          // console.log ('Fetching asset: ' + videoInfo[j].id + ' for ' + apiData.id);
          video_response = await fetchAsset(videoInfo[j].id, key);
          if (video_response !== undefined){
            video_data[j] = video_response.data.results;
          }
        }
        // console.log(video_data);
      }

      const nodeData = {
        dvids_id: apiData.id,
        title: apiData.title,
        slug: _.kebabCase(apiData.title),
        description: apiData.description,
        body: apiData.body,
        keywords: apiData.keywords,
        date_published: apiData.date_published,
        date: apiData.date,
        category: apiData.category,
        unit_name: apiData.unit_name,
        branch: apiData.branch,
        timestamp: apiData.timestamp,
        url: apiData.url,
        credit: apiData.credit,
        formatted_credit: formatted_credit,
        location: apiData.location,
        related_media: apiData.related_media,
        related_video: video_data,
        teaser_image___NODE: teaser_image_id,
        related_images___NODE: all_image_ids,
        id: createNodeId(`dvids-${apiData.id}`),
        parent: null,
        children: [],
        internal: {
          type: NODE_TYPE,
          content: JSON.stringify(apiData),
          contentDigest: createContentDigest(apiData),
        },
      }
      createNode(nodeData);
      //console.log(apiData.id + ' Created.');
      totalCreated++;
    }
  }
  console.log("DVIDS Press Releases: " + resultsProcessed + " Processed | " + totalCreated + " created.");
}
