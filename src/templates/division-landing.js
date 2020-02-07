import React from 'react';
import { graphql } from "gatsby";

import Layout from 'components/layout';
import HeroImage from 'components/heroImage';
import Sidebar from 'components/sidebar';
import Breadcrumbs from "components/breadcrumbs";
import DivisionHighlights from 'components/divisionHighlights';
import Leadership from 'components/leadership';

export const query = graphql`
    query ($id: String!, $code: Int!) {
        division: markdownRemark (id: {eq: $id}) {
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
                    fluid(maxWidth: 800) {
                      ...GatsbyImageSharpFluid_withWebp
                    }
                  }
                }
                publications_image {
                    childImageSharp {
                      fluid(maxWidth: 800) {
                        ...GatsbyImageSharpFluid_withWebp
                      }
                    }
                  }
                research_image {
                    childImageSharp {
                      fluid(maxWidth: 800) {
                        ...GatsbyImageSharpFluid_withWebp
                      }
                    }
                  }
                videos_image {
                    childImageSharp {
                      fluid(maxWidth: 800) {
                        ...GatsbyImageSharpFluid_withWebp
                      }
                    }
                  }
                template
                code
              }
            html
        },
        leadership: allMarkdownRemark(filter: {frontmatter: {template: {eq: "leadership"}, code: {eq: $code}}}) {
          edges {
            node {
              frontmatter {
                name
                title
                email
                fax
                phone
                picture {
                  childImageSharp {
                    fluid(maxWidth: 800) {
                      ...GatsbyImageSharpFluid_withWebp
                    }
                  }
                }
              }
              html
              id
            }
          }
        }
    }
`
const DivisionLanding = (props) => {
  return (
    <Layout
      pageMeta={{
        title: props.data.division.frontmatter.title,
      }}
    >
      <HeroImage frontmatter={props.data.division.frontmatter}/>
      <div className="title-block">
        <div className="content-wrapper">
          <div className="title-content">
            <h1>{props.data.division.frontmatter.title}</h1>
            <Breadcrumbs uri={props.uri} title={props.data.division.frontmatter.title}></Breadcrumbs>
          </div>
        </div>
      </div>
      <div className={"content-wrapper template-" + props.data.division.frontmatter.template}>
        <Sidebar uri={props.uri}></Sidebar>
        <div className="main-column">

          <div className="md-content" dangerouslySetInnerHTML={{ __html: props.data.division.html }} />

          <DivisionHighlights 
            code={props.data.division.frontmatter.code}
            news_image={props.data.division.frontmatter.news_image}
            publications_image={props.data.division.frontmatter.publications_image}
            research_image={props.data.division.frontmatter.research_image}
            videos_image={props.data.division.frontmatter.videos_image}
          />

          <h2>Leadership</h2>
          {props.data.leadership.edges.map((node, idx) => (
                <Leadership key={node.id} data={node} />
          ))}

        </div>
      </div>

    </Layout>
  );
};

export default DivisionLanding;
