import React from 'react';
import { graphql } from "gatsby";

import Layout from 'components/layout';
import HeroImage from 'components/heroImage';
import Sidebar from 'components/sidebar';
import Breadcrumbs from "components/breadcrumbs";
import ExpandedText from 'components/expandedText';
import DivisionHighlights from 'components/divisionHighlights';

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
                news_image {
                    childImageSharp {
                      fluid(maxWidth: 1200) {
                        ...GatsbyImageSharpFluid_withWebp
                      }
                    }
                  }
                publications_image {
                    childImageSharp {
                      fluid(maxWidth: 330) {
                        ...GatsbyImageSharpFluid_withWebp
                      }
                    }
                  }
                research_image {
                    childImageSharp {
                      fluid(maxWidth: 330) {
                        ...GatsbyImageSharpFluid_withWebp
                      }
                    }
                  }
                videos_image {
                    childImageSharp {
                      fluid(maxWidth: 330) {
                        ...GatsbyImageSharpFluid_withWebp
                      }
                    }
                  }
                template
                code
              }
            html
        } 
    }
`

const DivisionLanding = (props) => {
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
      <div className={"content-wrapper template-" + props.data.markdownRemark.frontmatter.template}>
        <Sidebar uri={props.uri}></Sidebar>
        <div className="main-column">

          <div className="md-content" dangerouslySetInnerHTML={{ __html: props.data.markdownRemark.html }} />

          <DivisionHighlights 
            code={props.data.markdownRemark.frontmatter.code}
            news_image={props.data.markdownRemark.frontmatter.news_image}
            publications_image={props.data.markdownRemark.frontmatter.publications_image}
            research_image={props.data.markdownRemark.frontmatter.research_image}
            videos_image={props.data.markdownRemark.frontmatter.videos_image}
          />

          <h2>Leadership</h2>
          <ExpandedText>
            <div className="leadership-bio-block">
              {/* <Img fluid={data.profileImage.childImageSharp.fluid} /> */}
              <div className="leadership-bio-content">
                <h3>GURPARTAP “GP” SANDHOO, D.SC.</h3>
                <p className="bio-title">Superintendent: Spacecraft Engineering Department</p>

                <div className="bio-contact">
                  <span className="bio-contact-label">E</span> <a href="mailto:spaenginfo@nrl.navy.mil" aria-label="email address">spaenginfo@nrl.navy.mil</a>
                </div>
                <div className="bio-contact">
                  <span className="bio-contact-label">P</span> <a href="tel:+12027676408" aria-label="phone number">(202) 767 6408</a>
                </div>
                <div className="bio-contact">
                  <span className="bio-contact-label">F</span> <a href="tel:+12027676429" aria-label="fax number">(202) 767 6429</a>
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

export default DivisionLanding;
