import React from "react";
import { Link } from "gatsby";

import breadcrumbStyles from "styles/breadcrumbs.module.scss";
import startCase from "lodash/startCase";

const Breadcrumbs = ({uri, title}) => {
    // Remove leading & trailing slashes
    let uriFixed = uri.replace(/^\/|\/$/g, '');

    // Some cleanup for the Federalist preview URLs
    uriFixed = uriFixed.replace('preview/melpers/nrl-gatsby/v0.4/', '');
    uriFixed = uriFixed.replace('preview/melpers/nrl-gatsby/v0.4', '');

    // Add back in a leading slash since we use that for Home below
    uriFixed = "/" + uriFixed;

    const path = uriFixed.split("/");

    let route = [];
    let label = [];
    for (var i=0; i < path.length; i++){
        if (i === 0) {
            route[i] = "/";
            label[i] = "Home";
        }
        else {
            route[i] = route[i-1] + path[i] + "/";
            if (title && i === (path.length - 1)) {
                label[i] = title;
            }
            else {
                label[i] = startCase(path[i]);
            }
        }
    }

    // The currrent page you are on needs to be dropped b/c we use that for the H1
    route.pop();
    label.pop();

    // Reverse the array because we need to show the breacrumbs in reverse order after the H1, per Darka.
    route.reverse();
    label.reverse();

    return (
        <>
            <ul className={breadcrumbStyles.breadcrumb}>
                {route.map((part, index) => (
                    <li key={label[index]}><Link to={part}>{label[index]}</Link></li>
                ))}
            </ul>
            {/* <pre>{JSON.stringify(route, null, 2)}</pre> */}
        </>
    )
}

export default Breadcrumbs