import React from 'react';
import { graphql, useStaticQuery } from "gatsby";

import Layout from 'components/layout';
import HeroImage from 'components/heroImage';

const Index = (props) => {
  const data = useStaticQuery(graphql`
    query {
      markdownRemark(
        fileAbsolutePath: {regex: "/pages/"},
        frontmatter: {title: {eq: "Home"}}
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
        title: "Home",
      }}
    >
      <HeroImage frontmatter={props.data.markdownRemark.frontmatter}>
        <div className="hero-text-wrapper">
          <div className="hero-text-block">
            <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}></div>
          </div>
        </div>
      </HeroImage>
      <div className="filler"></div>
    </Layout>
  );
};

export default Index;
