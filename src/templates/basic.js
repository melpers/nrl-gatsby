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
                      ...GatsbyImageSharpFluid_withWebp
                    }
                  }
                }
                image_float
                template
                code_name
              }
            html
        },
    }
`

const Basic = (props) => {
    const imageFloatClass = props.data.markdownRemark.frontmatter.image_float ? "image-float-" + props.data.markdownRemark.frontmatter.image_float : "";
  return (
    <Layout
      pageMeta={{
        title: props.data.markdownRemark.frontmatter.code_name ? props.data.markdownRemark.frontmatter.code_name + " " + props.data.markdownRemark.frontmatter.title : props.data.markdownRemark.frontmatter.title,
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
      <div className={"content-wrapper template-" + props.data.markdownRemark.frontmatter.template}>
        <Sidebar uri={props.uri}></Sidebar>
        <div className="main-column">
          <div className={"md-content image-float " + imageFloatClass} dangerouslySetInnerHTML={{ __html: props.data.markdownRemark.html }} />
        </div>
      </div>
    </Layout>
  );
};

export default Basic;
