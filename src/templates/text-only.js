import React from 'react';
import { graphql } from "gatsby";

import Layout from 'components/layout';
import HeroImage from 'components/heroImage';
import Sidebar from 'components/sidebar';
import Breadcrumbs from "components/breadcrumbs";

export const query = graphql`
    query ($id: String!) {
        markdownRemark (id: {eq: $id}) {
            frontmatter {
                title
                hero_size
                hero_color
                hero_image {
                  childImageSharp {
                    fluid(maxWidth: 1200) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            html
        },
    }
`

const TextOnly = (props) => {
  return (
    <Layout
      pageMeta={{
        title: props.data.markdownRemark.frontmatter.title,
      }}
    >
      <HeroImage frontmatter={props.data.markdownRemark.frontmatter}/>
      <div className="title-block">
        <div className="content-wrapper">
          <div className="title-content">
            <h1>{props.data.markdownRemark.frontmatter.title}</h1>
            <Breadcrumbs uri={props.uri} title={props.data.markdownRemark.frontmatter.title}></Breadcrumbs>
          </div>
        </div>
      </div>
      <div className="content-wrapper">
        <Sidebar uri={props.uri}></Sidebar>
        <div className="main-column" dangerouslySetInnerHTML={{ __html: props.data.markdownRemark.html }}></div>
      </div>
    </Layout>
  );
};

export default TextOnly
