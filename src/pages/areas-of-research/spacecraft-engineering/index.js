import React from 'react';
import { Link, graphql, useStaticQuery } from "gatsby";

import Layout from 'components/layout';
import Img from "gatsby-image/withIEPolyfill";
import HeroImage from 'components/heroImage';
import Sidebar from 'components/sidebar';
import Breadcrumbs from "components/breadcrumbs";
import ExpandedText from 'components/expandedText';

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
    profileImage: file(relativePath: { eq: "Sandhoo.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 800) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
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
          {/* <ul className="tabs">
            <li className="active">Overview</li>
            <li><Link to="/areas-of-research/spacecraft-engineering/leadership">Leadership</Link></li>
          </ul> */}

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

          <h2>Leadership</h2>
          <ExpandedText>
            <div className="leadership-bio-block">
              <Img fluid={data.profileImage.childImageSharp.fluid} />
              <div className="leadership-bio-content">
                <h3>GURPARTAP “GP” SANDHOO, D.SC.</h3>
                <p className="bio-title">Superintendent: Spacecraft Engineering Department</p>

                <div className="bio-contact">
                  <span className="bio-contact-label">E</span> <a href="mailto:spaenginfo@nrl.navy.mil">spaenginfo@nrl.navy.mil</a>
                </div>
                <div className="bio-contact">
                  <span className="bio-contact-label">P</span> (202) 767 6408
                </div>
                <div className="bio-contact">
                  <span className="bio-contact-label">F</span> (202) 767 6429
                </div>

              </div>
              <p>Dr. Sandhoo is the Superintendent of the Spacecraft Engineering Division of the Naval Center of Space Technology (NCST) at the U.S. Naval Research Laboratory (NRL). As the superintendent, he provides executive direction and technical leadership in the development of policies and objectives necessary in conducting research, design and development in the areas of satellite and orbital transfer vehicle systems, with an emphasis on new and advanced space systems and technologies to improve the performance of the Navy mission.</p>
              <p>The spacecraft engineering division is responsible for executing a $170 million program, including development of cutting-edge space capabilities in satellite servicing, space robotics, and satellite operations.</p>
              <p>After working at NASA’s Johnson Space Center, Johns Hopkins University’s Applied Physics Laboratory, and in industry, Sandhoo began his career at NRL in 2005 as a senior aerospace engineer on the Operationally Responsive Space initiative. He progressed into broader roles at NRL, including time as the science advisor for the U.S. Navy’s Fifth Fleet in Bahrain, and as a member of Naval Warfare Integration group (N00X) on the staff of Chief of Naval Operations.</p>
              <p>He holds a bachelor’s degree in mechanical engineering from the University of Maryland, a master’s degree in electrical engineering from Johns Hopkins University, a master’s from the U.S. Naval War College, a master’s and doctorate in aeronautics and astronautics from George Washington University, and is a MIT Seminar XXI fellow. Since 1986, he has served in uniform in the U.S. Marine Corps and U.S. Navy. Currently, Sandhoo is a Captain in the U.S. Navy Reserve as an Engineering Duty Officer.</p>
              <p>He is recipient of numerous personal, unit, and campaign awards, which are all a tribute to the Sailors, Marines, and civilians he served alongside throughout his Navy, Marine and civilian career. Of them all, he most treasures his peer awarded Battalion Marine of the Year Award.</p>
            </div>
          </ExpandedText>
        </div>
      </div>

    </Layout>
  );
};

export default Index;
