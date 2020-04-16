import React from "react";
import { Link } from "gatsby";

import { cleanPreviewUri } from 'utils/clean-preview-uri';
import breadcrumbStyles from "styles/breadcrumbs.module.scss";
import startCase from "lodash/startCase";

const Breadcrumbs = ({uri, title}) => {
  // Adjust the URI for the Federalist preview URLs
  uri = cleanPreviewUri(uri);
  const path = uri.split("/");

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