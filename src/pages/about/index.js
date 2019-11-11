import React from 'react';
import { Link, graphql, useStaticQuery } from "gatsby"

import Layout from 'components/layout';
import Sidebar from 'components/sidebar';

const Index = () => {
  const data = useStaticQuery(graphql`
  query {
    markdownRemark(
        fileAbsolutePath: {regex: "/pages/about/"},
        frontmatter: {title: {eq: "About NRL"}}
      ) {
      frontmatter {
        title
      }
      html
    }
  }
`)

  return (
    <div className="page-about">
      <Layout>
        <div className="hero-block-small hero-about" ></div>
        <div className="title-block">
          <div className="content-wrapper">
            <div className="title-content">
              <h1>{data.markdownRemark.frontmatter.title}</h1>
              <ul className="breadcrumbs">
                <li>
                  <Link to="/">Home</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="content-wrapper">
          <Sidebar menu="about"></Sidebar>
          <div className="main-column" dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}></div>
        </div>
      </Layout>
    </div>
  );
};

export default Index;
