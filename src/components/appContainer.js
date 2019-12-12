import React from "react";

const AppContainer = ({location, children}) => {
    let pageName = "";

    // Remove leading & trailing slashes
    let route = location.pathname.replace(/^\/|\/$/g, '');
    // Some cleanup for the Federalist preview URLs
    route = route.replace('preview/melpers/nrl-gatsby/v0.4/', '');
    route = route.replace('preview/melpers/nrl-gatsby/v0.4', '');

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