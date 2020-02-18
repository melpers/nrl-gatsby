import React from 'react';
import { Link, graphql, useStaticQuery } from "gatsby";

import Layout from 'components/layout';
import HeroImage from 'components/heroImage';
import Sidebar from 'components/sidebar';
import Breadcrumbs from "components/breadcrumbs";
import kebabCase from "lodash/kebabCase";

const Index = (props) => {
    const data = useStaticQuery(graphql`
        query {
            markdownRemark(
                fileAbsolutePath: {regex: "/pages/news/"},
                frontmatter: {title: {eq: "Categories"}}
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
            allMarkdownRemark(
                filter: {
                    frontmatter: {
                        categories: {ne: null}, 
                        template: {regex: "/news|video/"}
                    }
                }, 
                sort: {
                    fields: frontmatter___categories, order: ASC
                }
            ) {
                group(field: frontmatter___categories) {
                    fieldValue
                    totalCount
                }
            }
        }
    `)

    const catResults = props.data.allMarkdownRemark.group;
    var cats = {};
    catResults.map(cat => {
        let index = cat.fieldValue;
        if (cats[index]) {
            cats[index] += cat.totalCount;
          }
          else {
            cats[index] = cat.totalCount;
          }
          return true;
    });

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
            <div className="md-content" dangerouslySetInnerHTML={{ __html: props.data.markdownRemark.html }} />
            <ul className="categries-list">
            {Object.entries(cats).map(([catName, catCount]) => (
            <li key={catName}>
                <Link to={`/news/categories/${kebabCase(catName)}/`}>{catName.charAt(0).toUpperCase() + catName.slice(1)}</Link>
                <span className="category-count">&nbsp;({catCount})</span>
            </li>
            ))}
            </ul>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
