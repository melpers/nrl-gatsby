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
                author
                date
                categories
                template
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

const NewsArticle = (props) => {
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
      <div className={"content-wrapper template-" + props.data.markdownRemark.frontmatter.template}>
        <Sidebar uri={props.uri}></Sidebar>
        <div className="main-column">
            <div className="news-byline">
                <span>By: {props.data.markdownRemark.frontmatter.author} | {new Date(props.data.markdownRemark.frontmatter.date).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })}</span>
            </div>
            <div className="md-content image-center" dangerouslySetInnerHTML={{ __html: props.data.markdownRemark.html }} />
            <div className="article-categories">
              <span className="article-categories-label">Categories: </span>
              {props.data.markdownRemark.frontmatter.categories.map((cat, idx) => (
                <Link className="article-category-link" key={idx} to={`/news/categories/${kebabCase(cat)}/`}>{cat}</Link>
              ))}
            </div>
        </div>
      </div>
    </Layout>
  );
};

export default NewsArticle;
