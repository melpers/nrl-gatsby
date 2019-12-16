/**
* Checks the site URI for a preview string and removes it. 
*   Input: /preview/melpers/nrl-gatsby/v0.4/areas-of-research/spacecraft-engineering
*   Returns: /areas-of-research/spacecraft-engineering
*/
const cleanPreviewUri = uri => {
    // remove trailing slash
    uri = uri.replace(/\/$/, "");
    // if the uri starts with the preview string, remove the first 4 chunks
    if (uri.startsWith("/preview/")){
        uri = uri.replace(/([^/]*\/){5}/, '/')
    }
    return uri;
};
 
 export { cleanPreviewUri };