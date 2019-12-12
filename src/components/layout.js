import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { SkipNav } from 'uswds-react';

import { Helmet } from 'react-helmet'
import ThemeContext from '../context/ThemeContext';
import Header from 'components/header';
import Footer from 'components/footer';
import AppContainer from 'components/appContainer';
import { Location } from '@reach/router'

import './layout.css';

const mainContent = 'main-content';

const Layout = ({ pageMeta, children }) => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            title
            description
            keywords
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
    `}
    render={data => (
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
    )}
  />
);

export default Layout;
