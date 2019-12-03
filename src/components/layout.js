import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { SkipNav } from 'uswds-react';
import ThemeContext from '../context/ThemeContext';
import './layout.css';
import Header from 'components/header';
import Footer from 'components/footer';

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
      <ThemeContext.Consumer>
        {theme => (
          <div className={"container " + theme.pageName}>
            {/* <div className={(theme.dark ? 'dark' : 'light') + " " + theme.pageName + " container"}> */}
            <SkipNav skipsTo={mainContent} />
            <div className="usa-overlay" />
            <Header {...data.site.siteMetadata} />
            <main id={mainContent}>{children}</main>
            <Footer {...data.site.siteMetadata} />
          </div>
        )}
      </ThemeContext.Consumer>
    )}
  />
);

export default Layout;
