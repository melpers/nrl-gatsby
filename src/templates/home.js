import React from 'react';
import { graphql } from "gatsby";

import Layout from 'components/layout';
import HeroImage from 'components/heroImage';

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
              }
            html
        },
    }
`

const Home = (props) => {
  return (
    <Layout
      pageMeta={{
        title: "Home",
      }}
    >
      <HeroImage frontmatter={props.data.markdownRemark.frontmatter}>
        <div className="hero-text-wrapper">
          <div className="hero-text-block">
            <h1 dangerouslySetInnerHTML={{ __html: props.data.markdownRemark.html }}></h1>
          </div>
        </div>
      </HeroImage>
      <div className="filler"></div>
    </Layout>
  );
};

export default Home;
