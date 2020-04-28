import React from 'react';
import { graphql } from "gatsby";

import Layout from 'components/layout';
import HeroImage from 'components/heroImage';
import Sidebar from 'components/sidebar';
import Breadcrumbs from "components/breadcrumbs";
import DivisionHighlights from 'components/divisionHighlights';
import Leadership from 'components/leadership';

export const query = graphql`
  query ($id: String!, $code: String!) {
    division: markdownRemark (id: {eq: $id}) {
      frontmatter {
        title
        code
        template
        path
        sidebar_display
        hero_size
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
      }
      fields {
        contentHeaderHTML
        contentFooterHTML
        heroTextHTML
      }
      html
    },
    leadership: allMarkdownRemark(
      filter: {frontmatter: {template: {eq: "leadership"}, code: {eq: $code}}},
      sort: {fields: frontmatter___order, order: ASC}
    ) {
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
              publicURL
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
  let contentClasses = "content-wrapper";
  if (props.data.division.frontmatter.template) {
    contentClasses = contentClasses + " template-" + props.data.division.frontmatter.template;
  }
  if (props.data.division.frontmatter.sidebar_display === false) {
    contentClasses = contentClasses + " no-sidebar";
  }
  return (
    <Layout
      pageMeta={{
        title: props.data.division.frontmatter.title,
      }}
    >
      <HeroImage frontmatter={props.data.division.frontmatter}>
        {props.data.division.fields.heroTextHTML ? 
          <div className="hero-text-block">
            <div className="hero-text-block-wrapper">
              <div className="hero-text" dangerouslySetInnerHTML={{ __html: props.data.division.fields.heroTextHTML }} />
              <div className="yellow-bar"/>
            </div>
          </div>
          :
          ""
        }
      </HeroImage>
      <div className="title-block">
        <div className="content-wrapper">
          <div className="title-content">
            <h1>{props.data.division.frontmatter.title}</h1>
            <Breadcrumbs uri={props.uri} title={props.data.division.frontmatter.title}></Breadcrumbs>
          </div>
        </div>
      </div>

      {props.data.division.fields.contentHeaderHTML ? 
        <div className="md-content-header">
          <div className="content-wrapper" dangerouslySetInnerHTML={{ __html: props.data.division.fields.contentHeaderHTML }}></div>
        </div>
        :
        ""
      }

      <div className={contentClasses}>
        {props.data.division.frontmatter.sidebar_display !== false ? 
          <Sidebar uri={props.uri}></Sidebar>
          : 
          ""
        }

        <div className="main-column">

          <div className="md-content" dangerouslySetInnerHTML={{ __html: props.data.division.html }} />

          {props.data.division.frontmatter.news_image ? 
            <DivisionHighlights 
              code={props.data.division.frontmatter.code}
              path={props.data.division.frontmatter.path}
              news_image={props.data.division.frontmatter.news_image}
              publications_image={props.data.division.frontmatter.publications_image}
              research_image={props.data.division.frontmatter.research_image}
              videos_image={props.data.division.frontmatter.videos_image}
            />
            :
            ""
          }

          {props.data.leadership.edges.length > 0 ? 
            <React.Fragment>
              <h2>Leadership</h2>
              {props.data.leadership.edges.map((node, idx) => (
                <Leadership key={idx} data={node} />
              ))}
            </React.Fragment>
            :
            ""
          }

          {props.data.division.fields.contentFooterHTML ? 
            <div className="md-content-footer" dangerouslySetInnerHTML={{ __html: props.data.division.fields.contentFooterHTML }} />
            :
            ""
          }

        </div>
      </div>
    </Layout>
  );
};

export default DivisionLanding;
