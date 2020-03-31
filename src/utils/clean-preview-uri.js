/**
* Checks the site URI for a preview string and removes it. 
*   Input: /preview/melpers/nrl-gatsby/v0.4/areas-of-research/spacecraft-engineering
*   Returns: /areas-of-research/spacecraft-engineering
*/
const cleanPreviewUri = (uri) => {
    console.log(uri);
    // remove trailing slash
    uri = uri.replace(/\/$/, "");
    console.log(uri);
    // if the uri starts with the preview string, remove the first 4 chunks
    if (uri.startsWith("/preview/")){
        uri = uri.replace(/([^/]*\/){5}/, '/')
    }
    console.log(uri);
    return uri;
};
 
 export { cleanPreviewUri };