import React from 'react';
import { graphql, useStaticQuery } from "gatsby"

import Layout from 'components/layout';

const Index = () => {
  const data = useStaticQuery(graphql`
    query {
      markdownRemark(
        fileAbsolutePath: {regex: "/pages/"},
        frontmatter: {title: {eq: "Home"}}
      ) {
      frontmatter {
        title
      }
      html
    }
    }
  `)

  return (
    <div className="page-home">
      <Layout>
        <div className="hero-block-large hero-home">
          <div className="hero-text-wrapper">
            <div className="hero-text-block">
              <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}></div>
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
