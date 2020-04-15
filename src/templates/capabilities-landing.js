import React from 'react';
import { Link, graphql } from "gatsby";

import Layout from 'components/layout';
import HeroImage from 'components/heroImage';
import Sidebar from 'components/sidebar';
import Breadcrumbs from "components/breadcrumbs";

export const query = graphql`
    query ($id: String!, $code: String!) {
        markdownRemark (id: {eq: $id}) {
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
                code_name
            }
            html
        },
        allMarkdownRemark (
            filter: {
                frontmatter: {
                    template: {eq: "core-capabilities"},
                    code: {eq: $code}
                }
            },
            sort: {
                fields: frontmatter___title, 
                order: ASC
            }
            ) {
            edges {
                node {
                    frontmatter {
                        title
                        path
                    }
                }
            }
        }
    }
`

const CapabilitiesLanding = (props) => {
  return (
    <Layout
      pageMeta={{
        title: props.data.markdownRemark.frontmatter.code_name + " " + props.data.markdownRemark.frontmatter.title,
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
      <div className="content-wrapper">
        <Sidebar uri={props.uri}></Sidebar>
        <div className="main-column">
          <div className="md-content list-style-dash three-col-list">
            <div dangerouslySetInnerHTML={{ __html: props.data.markdownRemark.html }} />
            <ul>
              {props.data.allMarkdownRemark.edges.map((result, idx) => (
                <li key={idx}>
                  <Link to={ result.node.frontmatter.path }>{ result.node.frontmatter.title }</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CapabilitiesLanding;
