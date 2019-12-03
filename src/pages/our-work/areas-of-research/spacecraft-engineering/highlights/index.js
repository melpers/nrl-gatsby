import React from 'react';
import { Link, graphql, useStaticQuery } from "gatsby";

import Layout from 'components/layout';
import Img from "gatsby-image";
import HeroImage from 'components/heroImage';
import Sidebar from 'components/sidebar';
import Breadcrumbs from "components/breadcrumbs";

const Index = (props) => {
  const data = useStaticQuery(graphql`
  query {
    markdownRemark(
        fileAbsolutePath: {regex: "/pages/our-work/areas-of-research/spacecraft-engineering/highlights/"},
        frontmatter: {title: {eq: "Highlights"}}
      ) {
      frontmatter {
        title
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
      html
    },
    newsImage: file(relativePath: { eq: "highlights-news.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 800) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    },
    newsImageLg: file(relativePath: { eq: "highlights-news-lg.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 800) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    },
    videosImage: file(relativePath: { eq: "highlights-videos.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 800) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    },
    pubsImage: file(relativePath: { eq: "highlights-pubs.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 800) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    },
    researchImage: file(relativePath: { eq: "highlights-research.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 800) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    },
  }
`)

  return (
    <Layout>
      <HeroImage frontmatter={props.data.markdownRemark.frontmatter}/>
      <div className="title-block">
        <div className="content-wrapper">
          <div className="title-content">
            <h1>{data.markdownRemark.frontmatter.title}</h1>
            <Breadcrumbs uri={props.uri} title={props.data.markdownRemark.frontmatter.title}></Breadcrumbs>
          </div>
        </div>
      </div>
      <div className="content-wrapper">
        <Sidebar uri={props.uri}></Sidebar>
        <div className="main-column">
          <ul className="tabs">
            <li><Link to="/our-work/areas-of-research/spacecraft-engineering">Overview</Link></li>
            <li className="active">Highlights</li>
          </ul>
          <div className="main-content-block">

            <div className="article-preview-block">
              <div className="image-box">
                <Img fluid={data.newsImageLg.childImageSharp.fluid} />
                <div className="image-box-content">
                  <h3>News Article</h3>
                  <p>The U.S. Naval Research Laboratory and the U.S. Naval Academy Museum combined resources to tell the story of how the Navy ushered in our nation’s presence in space... Read More</p>
                </div>
              </div>
            </div>

            <div className="section-grid">
              <div className="image-box-wrapper">
                <div className="image-box">
                  <Img fluid={data.newsImage.childImageSharp.fluid} />
                  <div className="image-box-content">
                    <h3>News</h3>
                  </div>
                </div>
              </div>

              <div className="image-box-wrapper">
                <div className="image-box">
                  <Img fluid={data.videosImage.childImageSharp.fluid} />
                  <div className="image-box-content">
                    <h3>Videos</h3>
                  </div>
                </div>
              </div>

              <div className="image-box-wrapper">
                <div className="image-box">
                  <Img fluid={data.pubsImage.childImageSharp.fluid} />
                  <div className="image-box-content">
                    <h3>Publications</h3>
                  </div>
                </div>
              </div>

              <div className="image-box-wrapper">
                <div className="image-box">
                  <Img fluid={data.researchImage.childImageSharp.fluid} />
                  <div className="image-box-content">
                    <h3>Research</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
