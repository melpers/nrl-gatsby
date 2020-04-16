import React from "react";
import { cleanPreviewUri } from 'utils/clean-preview-uri';

const AppContainer = ({location, children}) => {
  let pageName = "";

  let route = location.pathname;
  // Adjust the URI for the Federalist preview URLs
  route = cleanPreviewUri(route);

  if (route === ""){
    pageName += "page-home";
  }
  else {
    let routeParts = route.split("/");
    for (let i = 0; i < routeParts.length; i++) {
      if ( i === (routeParts.length - 1) ){
        pageName += "path-" + routeParts[i] + " ";
        pageName += "page-" + routeParts[i];
      }
      else {
        pageName += "path-" + routeParts[i] + " ";
      }
    }
  }

  return (
    <div className={"container " + pageName}>
      {children}
    </div>
  )
}

export default AppContainer