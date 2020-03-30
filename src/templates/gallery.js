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
        allFile(filter: {
            extension: {regex: "/(jpg)|(png)|(tif)|(tiff)|(webp)|(jpeg)/"}, 
            absolutePath: {regex: "/(/src/pages/areas-of-research/)/"},
        }) {
            edges {
              node {
                childImageSharp {
                    id
                    fluid {
                        ...GatsbyImageSharpFluid
                        originalImg
                    }
                }
                name
                extension
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
                images={props.data.allFile.edges.map(({ node }) => ({
                    ...node.childImageSharp.fluid,
                    alt: `${node.name}`,
                    id: `${node.childImageSharp.id}`,
                    caption: `${node.name}.${node.extension}`
                }))}
            />
        </div>
      </div>
    </Layout>
  );
};

export default GalleryPage;
