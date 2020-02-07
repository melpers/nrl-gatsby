import React from 'react';
import { graphql, useStaticQuery, Link } from "gatsby";

import Layout from 'components/layout';
import HeroImage from 'components/heroImage';
import Sidebar from 'components/sidebar';
import Breadcrumbs from "components/breadcrumbs";

const Index = (props) => {
  const data = useStaticQuery(graphql`
    query {
      markdownRemark(
          fileAbsolutePath: {regex: "/pages/areas-of-research/spacecraft-engineering/core-capabilities/"},
          frontmatter: {title: {eq: "Core Capabilities"}}
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
          code_name
        }
        html
      },
      allMarkdownRemark(
        filter: {
          frontmatter: {template: {eq: "core-capabilities"}}, 
          fileAbsolutePath: {regex: "/pages/areas-of-research/spacecraft-engineering/core-capabilities/"}
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
  `)

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
            <h1>{data.markdownRemark.frontmatter.title}</h1>
            <Breadcrumbs uri={props.uri} title={props.data.markdownRemark.frontmatter.title}></Breadcrumbs>
          </div>
        </div>
      </div>
      <div className="content-wrapper">
        <Sidebar uri={props.uri}></Sidebar>
        <div className="main-column">
          <div className="md-content list-style-dash three-col-list">
            <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
            <ul>
              {data.allMarkdownRemark.edges.map((result, idx) => (
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

export default Index;
