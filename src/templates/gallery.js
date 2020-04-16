import React from 'react';
import { graphql } from "gatsby";

import Layout from 'components/layout';
import HeroImage from 'components/heroImage';
import Sidebar from 'components/sidebar';
import Breadcrumbs from "components/breadcrumbs";
import ImageGallery from "components/imageGallery";

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
        template
        code_name
        }
      html
    },
    allDvidsImage (
      filter: {
        unit_name: {eq: "U.S. Naval Research Laboratory"}
      }
    ) {
      edges {
        node {
          description
          dvidsImage {
            childImageSharp {
              id
              fluid {
                ...GatsbyImageSharpFluid
                originalImg
              }
            }
          }
        }
      }
    }
  }
`

const GalleryPage = (props) => {
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
      <div className="md-content" dangerouslySetInnerHTML={{ __html: props.data.markdownRemark.html }} />
      <ImageGallery
        images={props.data.allDvidsImage.edges.map(({ node }) => ({
          ...node.dvidsImage.childImageSharp.fluid,
          alt: `${node.description}`,
          id: `${node.dvidsImage.childImageSharp.id}`,
          caption: `${node.description}`
        }))}
      />
    </div>
    </div>
  </Layout>
  );
};

export default GalleryPage;
