import React from 'react';
import { Link, graphql, useStaticQuery } from "gatsby";

import Layout from 'components/layout';
import HeroImage from 'components/heroImage';
import Sidebar from 'components/sidebar';
import Breadcrumbs from "components/breadcrumbs";

const Index = (props) => {
  const data = useStaticQuery(graphql`
  query {
    markdownRemark(
        fileAbsolutePath: {regex: "/pages/our-work/areas-of-research/"},
        frontmatter: {title: {eq: "Areas of Research"}}
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
    }
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
          <div class="area-block">
            <h2>Autonomous & Unmanned Systems</h2>
            <ul>
              <li>Radar / Tactical Electronic Warfare</li>
            </ul>
          </div>
          <div class="area-block">
            <h2>Chemical & Biological Sciences</h2>
            <ul>
              <li>Chemistry</li>
            </ul>
          </div>
          <div class="area-block">
            <h2>Electronic Warfare</h2>
            <ul>
              <li>Electronic Science & Technology / Radar</li>
              <li>Tactical Electronic Warfare</li>
            </ul>
          </div>
          <div class="area-block">
            <h2>Environments [Sea/Air/Space]</h2>
            <ul>
              <li>Acoustics / Marine Geosciences</li>
              <li>Marine Meteorology</li>
              <li>Ocean Atmospheric Science Tech</li>
              <li>Oceanography</li>
              <li>Plasma Physics Remote Sensing</li>
              <li>Space Science</li>
            </ul>
          </div>
          <div class="area-block">
            <h2>Information Sciences</h2>
            <ul>
              <li>Artificial Intelligence</li>
              <li>Information Technology</li>
            </ul>
          </div>
          <div class="area-block">
            <h2>Materials</h2>
            <ul>
             <li>Material Science & Component Technology</li>
              <li>Optical Sciences</li>
            </ul>
          </div>
          <div class="area-block">
            <h2>Nanotechnology</h2>
            <ul>
              <li>Electronic Science & Technology</li>
              <li>Optical Sciences / Quantum Research</li>
            </ul>
          </div>
          <div class="area-block">
            <h2>Power & Energy</h2>
            <ul>
              <li>Biomoleculer Science & Engineering</li>
              <li>Electronic Sciences & Technology</li>
              <li>Plasma Physics</li>
            </ul>
          </div>
          <div class="area-block">
            <h2><Link to="/our-work/areas-of-research/spacecraft-engineering">Spacecraft Engineering</Link></h2>
            <ul>
              <li>Naval Center for Space Technology</li>
              <li>Space Science / Space Systems Development</li>
            </ul>
          </div>
        </div>

      </div>
    </Layout>
  );
};

export default Index;
