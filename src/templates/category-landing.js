import React from 'react';
import { Link, graphql } from "gatsby";

import Layout from 'components/layout';
import HeroImage from 'components/heroImage';
import Sidebar from 'components/sidebar';
import Breadcrumbs from "components/breadcrumbs";
import kebabCase from "lodash/kebabCase";

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
                template
              }
            html
        },
        allMarkdownRemark(
            filter: {
                frontmatter: {
                    categories: {ne: null}, 
                    template: {in: ["news-article", "news-video"]}
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
`

const CategoryLanding = (props) => {
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
            <h1>{props.data.markdownRemark.frontmatter.title}</h1>
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

export default CategoryLanding;
