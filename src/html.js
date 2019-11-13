import React from "react"
import PropTypes from "prop-types"
import { Location } from '@reach/router';

export default function HTML(props) {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600&display=swap" rel="stylesheet" />
        {props.headComponents}
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <noscript key="noscript" id="gatsby-noscript">
          This app works best with JavaScript enabled.
        </noscript>
        <Location>
            {({ location }) => {
                /* Add a className to the context specific to each page to help with styling:
                    Prepend 'page' to the pathname,
                    then replace all "/" characters with "-",
                    then if the last character is a "-" remove it.
                */
                let pageName = "page" + location.pathname.replace(/\//g, '-').replace(/-$/, '');
                if (pageName === "page") {
                    pageName = "page-home"
                }
                return (
                  <div
                    key={`body`}
                    id="___gatsby"
                    className={pageName}
                    dangerouslySetInnerHTML={{ __html: props.body }}
                  />
                )
            }}
        </Location>
        {props.postBodyComponents}
      </body>
    </html>
  )
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
