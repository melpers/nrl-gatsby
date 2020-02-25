import React from 'react';
import { graphql } from "gatsby";

import Layout from 'components/layout';
import HeroImage from 'components/heroImage';
import Sidebar from 'components/sidebar';
import Breadcrumbs from "components/breadcrumbs";
import VideoTeaser from "components/videoTeaser";

export const query = graphql`
    query {
        markdownRemark (
            frontmatter: {title: {eq: "Videos"}}
          ) {
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
              }
            html
        },
        allMarkdownRemark(
            filter: {frontmatter: {template: {eq: "news-video"}}}, 
            sort: {order: DESC, fields: frontmatter___date}
        ) {
            edges {
                node {
                    frontmatter {
                    title
                    date
                    teaser
                    teaser_image {
                        childImageSharp {
                            fluid(maxWidth: 548) {
                                ...GatsbyImageSharpFluid_withWebp
                            }
                        }
                      }
                    }
                }
            }
        }
    }
`

const Videos = (props) => {
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
          <div className="md-content image-float" dangerouslySetInnerHTML={{ __html: props.data.markdownRemark.html }} />
          {props.data.allMarkdownRemark.edges.map((teaser, idx) => (
            <VideoTeaser teaser={teaser} key={idx} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Videos;
