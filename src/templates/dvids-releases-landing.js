import React from 'react';
import { graphql } from "gatsby";

import Layout from 'components/layout';
import HeroImage from 'components/heroImage';
import Sidebar from 'components/sidebar';
import Breadcrumbs from "components/breadcrumbs";
import NewsDvidsTeaser from "components/newsDvidsTeaser";

export const query = graphql`
  query ($id: String!) {
    markdownRemark (id: {eq: $id}){
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
    allDvidsPressReleases (
      filter: {
        teaser_image: {dvids_id: {ne: null}
      }
    }) {
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
    }
  }
`

const NewsLanding = (props) => {
  const teasers = props.data.allDvidsPressReleases;
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
      {teasers.edges.map((teaser, idx) => (
      <NewsDvidsTeaser teaser={teaser} key={idx} />
      ))}
    </div>
    </div>
  </Layout>
  );
};

export default NewsLanding;
