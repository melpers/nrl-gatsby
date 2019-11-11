import React from 'react';
import { graphql, useStaticQuery } from "gatsby"

import Layout from '../components/layout';

const Index = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        filter: {
          fileAbsolutePath: {
            regex: "/pages/"
          },
          frontmatter: {
            title: {
              eq: "Home"
            }
          }
        }){
        edges {
          node {
            html
            frontmatter {
              title
            }
          }
        }
      }
    }
  `)

  return (
    <div className="page-home">
      <Layout>
        <div className="hero-block-large hero-home">
          <div className="hero-text-wrapper">
            <div className="hero-text-block">
              <div dangerouslySetInnerHTML={{ __html: data.allMarkdownRemark.edges[0].node.html }}></div>
            </div>
          </div>
        </div>
        <div className="content-wrapper">
        </div>
      </Layout>
    </div>
  );
};

export default Index;
