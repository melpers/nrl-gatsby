import React from 'react';
import { graphql, useStaticQuery } from "gatsby";

import Layout from 'components/layout';
import HeroImage from 'components/heroImage';
import Sidebar from 'components/sidebar';
import Breadcrumbs from "components/breadcrumbs";

const Index = (props) => {
  const data = useStaticQuery(graphql`
  query {
    markdownRemark(
        fileAbsolutePath: {regex: "/pages/areas-of-research/spacecraft-engineering/facilities/"},
        frontmatter: {title: {eq: "Acoustic Chamber"}}
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
          <div className="md-content first-float" dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
