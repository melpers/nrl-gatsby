import React from 'react';
import { Link, graphql } from "gatsby";

import Layout from 'components/layout';
import HeroImage from 'components/heroImage';
import Sidebar from 'components/sidebar';
import Breadcrumbs from "components/breadcrumbs";

const _ = require("lodash");

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
    },
    allDvidsPressReleases (
      filter: {
        keywords: {ne: "null"}
      }
    ) {
      edges {
        node {
          keywords
        }
      }
    }
  }
`

const CategoryLanding = (props) => {
  var cats = {};

  const catResults = props.data.allMarkdownRemark.group;
  catResults.map(cat => {
    let index = cat.fieldValue.charAt(0).toUpperCase() + cat.fieldValue.slice(1) ;
    if (cats[index]) {
      cats[index] += cat.totalCount;
    }
    else {
      cats[index] = cat.totalCount;
    }
    return true;
  });

  const dvidsResults = props.data.allDvidsPressReleases.edges;
  dvidsResults.map(edge => {
    let keywordsArray = _.split(edge.node.keywords, ",");
    keywordsArray.forEach (keyword => {
      let cleanKeyword = _.trim(keyword).charAt(0).toUpperCase() + _.trim(keyword).slice(1);
      if (cats[cleanKeyword]) {
        cats[cleanKeyword] += 1;
      }
      else {
        cats[cleanKeyword] = 1;
      }
    })
    return true;
  });

  let sortedCats = {};
  Object.keys(cats).sort().forEach(function(key) {
    sortedCats[key] = cats[key];
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
      {Object.entries(sortedCats).map(([catName, catCount]) => (
      <li key={catName}>
        <Link to={`/news/categories/${_.kebabCase(catName)}/`}>{catName}</Link>
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
