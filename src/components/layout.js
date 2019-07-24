import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { SkipNav } from 'uswds-react';
import './layout.css';
import Header from './header';
import Footer from './footer';

const mainContent = 'main-content';

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            title
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
      <div class="container">
        <SkipNav skipsTo={mainContent} />
        <div className="usa-overlay" />
        <Header {...data.site.siteMetadata} />
        <main id={mainContent}>{children}</main>
        <Footer {...data.site.siteMetadata} />
      </div>
    )}
  />
);

export default Layout;
