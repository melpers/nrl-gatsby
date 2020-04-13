import React from 'react';
import { graphql } from "gatsby";

import Layout from 'components/layout';
import HeroImage from 'components/heroImage';
import Sidebar from 'components/sidebar';
import Breadcrumbs from "components/breadcrumbs";
import NewsTeaser from "components/newsTeaser";
import VideoTeaser from "components/videoTeaser";
import NewsDvidsTeaser from "components/newsDvidsTeaser";

export const query = graphql`
    query ($category: String!, $categoryRegex: String!) {
        allMarkdownRemark(
            filter: {frontmatter: {categories: {in: [$category]}, template: {in: ["news-article", "news-video"]}}},
            sort: {order: DESC, fields: frontmatter___date}
        ) {
            edges {
                node {
                    frontmatter {
                        title
                        template
                        author
                        date
                        teaser
                        teaser_image {
                            childImageSharp {
                                fluid( maxWidth: 884, maxHeight: 576, srcSetBreakpoints: [ 884, 442 ] ) {
                                    ...GatsbyImageSharpFluid_withWebp
                                }
                            }
                        }
                    }
                }
            }
        },
        allDvidsPressReleases (
            filter: { keywords: {regex: $categoryRegex} }
        ) {
            edges {
                node {
                    title
                    description
                    date_published
                    formatted_credit
                    teaser_image {
                        description
                        dvidsImage {
                            childImageSharp {
                                fluid( maxWidth: 884, maxHeight: 576, srcSetBreakpoints: [ 884, 442 ] ) {
                                    ...GatsbyImageSharpFluid_withWebp
                                }
                            }
                            publicURL
                        }
                    }
                    slug
                    id
                }
            }
        },
        markdownRemark(
            fileAbsolutePath: {regex: "/pages/news/"},
            frontmatter: {title: {eq: "Categories"}}
        ) {
          frontmatter {
              hero_image {
                  childImageSharp {
                      fluid(maxWidth: 1200) {
                          ...GatsbyImageSharpFluid
                      }
                  }
              }
              hero_color
              hero_size
          }
        }
    }
`

const Category = (props) => {
  return (
    <Layout
      pageMeta={{
        title: "Test",
      }}
    >
      <HeroImage frontmatter={props.data.markdownRemark.frontmatter}/>
      <div className="title-block">
        <div className="content-wrapper">
          <div className="title-content">
            <h1>{props.pageContext.title}</h1>
            <Breadcrumbs uri={props.uri} title={props.title}></Breadcrumbs>
          </div>
        </div>
      </div>
      <div className="content-wrapper">
        <Sidebar uri={props.uri}></Sidebar>
        <div className="main-column">
          {props.data.allMarkdownRemark.edges.map((teaser, idx) => (
              teaser.node.frontmatter.template === "news-article" ? <NewsTeaser teaser={teaser} key={idx} /> : <VideoTeaser teaser={teaser} key={idx} />
          ))}
          {props.data.allDvidsPressReleases.edges.map((teaser, idx) => (
            <NewsDvidsTeaser teaser={teaser} key={idx} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Category;
