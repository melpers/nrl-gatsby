import React, { useEffect } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { SkipNav } from 'uswds-react';

import { Helmet } from 'react-helmet'
import ThemeContext from '../context/ThemeContext';
import Header from 'components/header';
import Footer from 'components/footer';
import AppContainer from 'components/appContainer';
import { Location } from '@reach/router'

import truncate from "lodash/truncate";
import './layout.css';

const mainContent = 'main-content';

// forEach method
var forEach = function (array, callback, scope) {
  for (var i = 0; i < array.length; i++) {
    callback.call(scope, i, array[i]); // passes back stuff we need
  }
};

// Requst from Darka to make sure no orphans are displayed. See https://en.wikipedia.org/wiki/Widows_and_orphans
function cleanupOrphans(str){
  var pos = str.lastIndexOf(' ');
  return str.substring(0,pos) + "&nbsp;" + str.substring(pos+1);
}

const Layout = ({ pageMeta, children }) => {
  useEffect(() => {
    let paragraphs = document.querySelectorAll('.main-column p');
    forEach(paragraphs, function (index, value) {
      // console.log(index, value); // passes index + value back!
      let str = paragraphs[index].innerHTML.trim();
      // If we already have a non-breaking space in the paragraph somewhere, let's not replace any more spaces.
      // Also do not replace anything if there is HTML in the paragraph, as this may break things.
      if (!str.includes("&nbsp;") && !str.includes("</")){
        paragraphs[index].innerHTML = cleanupOrphans(str);
      }
    });
  });

  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          keywords
          siteUrl
          header {
            navigation {
              title
              items {
                text
                link
                type
                depth
              }
            }
          }
          footer {
            navigation {
              title
              items {
                text
                link
                type
              }
            }
          }
        }
      }
    }
  `)

  const seoImageURL = data.site.siteMetadata.siteUrl + pageMeta.seoImage;
  const seoVideoURL = "https://www.youtube.com/watch?v=" + pageMeta.seoVideo;

  return (
      <ThemeContext.Consumer>
        {theme => (
          <React.Fragment>
            <Helmet>
              <title>{pageMeta.title ? `${pageMeta.title} | ${data.site.siteMetadata.title}` : `${data.site.siteMetadata.title}`}</title>
              <meta name="description" content={pageMeta.description ? `${pageMeta.description}` : `${data.site.siteMetadata.description}`} />
              <meta name="keywords" content={pageMeta.keywords ? `${pageMeta.keywords}` : `${data.site.siteMetadata.keywords}` }/>
              {/* Chrome, Firefox OS and Opera */}
              <meta name="theme-color" content="#ffffff" /> 
              {/* Windows Phone */}
              <meta name="msapplication-navbutton-color" content="#ffffff" />
              {/* iOS Safari */}
              <meta name="apple-mobile-web-app-capable" content="yes" />
              <meta name="apple-mobile-web-app-status-bar-style" content="white" />
              {/* OG Tags */}
              <meta name="og:title" content={pageMeta.title ? `${pageMeta.title}` : `${data.site.siteMetadata.title}`} />
              <meta name="og:description" content={truncate(pageMeta.description ? `${pageMeta.description}` : `${data.site.siteMetadata.description}`, {'length': 300})} />
              {pageMeta.seoImage ? <meta name="og:image" content={`${seoImageURL}`} /> : "" }
              {pageMeta.seoImageType ? <meta name="og:image:type" content={`${pageMeta.seoImageType}`} /> : "" }
              {pageMeta.seoImageAlt ? <meta name="og:image:alt" content={`${pageMeta.seoImage}`} /> : "" }
              {pageMeta.seoImageHeight ? <meta name="og:image:height" content={`${pageMeta.seoImageType}`} /> : "" }
              {pageMeta.seoImageWidth ? <meta name="og:image:width" content={`${pageMeta.seoImageType}`} /> : "" }
              {pageMeta.seoVideo ? <meta name="og:video" content={`${seoVideoURL}`} /> : "" }
              {/* Twitter Card Tags */}
              <meta name="twitter:description" content={truncate(pageMeta.description ? `${pageMeta.description}` : `${data.site.siteMetadata.description}`, {'length': 200})} />
            </Helmet>
            <Location>
              {({ location }) => {
                return (
                  <AppContainer location={location}>
                    {/* <div className={(theme.dark ? 'dark' : 'light') + " " + theme.pageName + " container"}> */}
                    <SkipNav skipsTo={mainContent} />
                    <div className="usa-overlay" />
                    <Header {...data.site.siteMetadata} />
                    <main id={mainContent}>
                      {children}
                    </main>
                    <Footer {...data.site.siteMetadata} />
                  </AppContainer>
                )
              }}
            </Location>
          </React.Fragment>
        )}
      </ThemeContext.Consumer>
    )
}

export default Layout;
