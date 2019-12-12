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
        fileAbsolutePath: {regex: "/pages/areas-of-research/spacecraft-engineering/"},
        frontmatter: {title: {eq: "Spacecraft Engineering"}}
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
    <Layout
      pageMeta={{
        title: props.data.markdownRemark.frontmatter.title,
      }}
    >
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
            <li className="active">Overview</li>
            <li><Link to="/areas-of-research/spacecraft-engineering/leadership">Leadership</Link></li>
          </ul>

          <p>The Spacecraft Engineering Division (SED) designs, builds, and operates pioneering and innovative spacecraft and space systems. The SED functions as a prototype laboratory for new and operationally relevant space based capabilities. From cradle to grave, the division provides expertise in mission design, systems design and engineering, and hardware expertise for every aspect of a space system. The division has a history of transitioning advanced technologies into operations and industry, applying expertise in systems integration, design and verification, dynamics and control systems, electronics and software, and mission operations to develop advanced space technologies.</p>


          <h2>Highlights</h2>
          <div className="highlights-block">
            <div className="article-preview-block">
              <div className="image-box">
                <Img fluid={data.newsImageLg.childImageSharp.fluid} />
                <div className="image-box-content">
                  <h3>Latest Article Title Goes Here</h3>
                  <p>The U.S. Naval Research Laboratory and the U.S. Naval Academy Museum combined resources to tell the story of how the Navy ushered in our nation’s presence in space... Read More</p>
                </div>
              </div>
            </div>

            <div className="section-grid">
              <div className="image-box-wrapper">
                <Link className="image-box-link" to="/news">
                  <div className="image-box">
                    <Img fluid={data.newsImage.childImageSharp.fluid} />
                    <div className="image-box-content">
                      <h3>Division News</h3>
                    </div>
                  </div>
                </Link>
              </div>

              <div className="image-box-wrapper">
                <Link className="image-box-link" to="/videos">
                  <div className="image-box">
                    <Img fluid={data.videosImage.childImageSharp.fluid} />
                    <div className="image-box-content">
                      <h3>Division Videos</h3>
                    </div>
                  </div>
                </Link>
              </div>

              <div className="image-box-wrapper">
                <Link className="image-box-link" to="/areas-of-research/spacecraft-engineering/publications">
                  <div className="image-box">
                    <Img fluid={data.pubsImage.childImageSharp.fluid} />
                    <div className="image-box-content">
                      <h3>Publications</h3>
                    </div>
                  </div>
                </Link>
              </div>

              <div className="image-box-wrapper">
                <Link className="image-box-link" to="/areas-of-research/spacecraft-engineering/research">
                  <div className="image-box">
                    <Img fluid={data.researchImage.childImageSharp.fluid} />
                    <div className="image-box-content">
                      <h3>Research</h3>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>







        </div>
      </div>

    </Layout>
  );
};

export default Index;
