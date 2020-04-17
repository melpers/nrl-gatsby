import React, { useState } from 'react';
import { graphql } from "gatsby";

import Layout from 'components/layout';
import HeroImage from 'components/heroImage';
import Sidebar from 'components/sidebar';
import Breadcrumbs from 'components/breadcrumbs';
import Datasort from 'react-data-sort';

export const query = graphql`
  query ($id: String!, $code: String!) {
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
        code_name
        }
      html
    },
    allPublicationsCsv(filter: {code: {eq: $code}}) {
      edges {
        node {
          author
          code
          journal
          pubNumber
          title
          year
        }
      }
    }
  }
`

const Index = (props) => {
  let publicationsData = props.data.allPublicationsCsv.edges
  const [sortBy, setSortBy] = useState("year");
  const [direction, setDirection] = useState("desc");
  const filters = ["author", "year", "title", "pub_number"];

  const RenderFilters = (props) => {
  return (
    <div className="pub-filter">
    <span className="pub-filter-label">Sort By:</span>
      {props.filters.map((filter, idx) => 
      <RenderFilter key={idx} filter={filter} />
      )}
    </div>
  )
  }

  const RenderFilter = ({filter}) => {
  let nextDirection = "asc";
  if (sortBy === filter && direction === "asc") {
    nextDirection = "desc";
  }
  return (
    <button className={sortBy === filter ? "active " + direction : ""} onClick={() => handleResort(filter, nextDirection)}>{filter === "pub_number" ? "Publication #" : filter}</button>
  )
  }

  const handleResort = (newSort, newDir) => {
  setSortBy(newSort);
  setDirection(newDir);
  }

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
      <RenderFilters filters={filters} />
      <div className="main-content-block">
      <div className="publication-list">
        <Datasort
        data={publicationsData}
        sortBy={sortBy}
        direction={direction}
        render={({ data }) => (
          <ul>
          {data.map((publication) => (
          <li key={publication.node.pub_number}>
            {publication.node.author + " (" + publication.node.year + ") " + publication.node.title + " " + publication.node.journal}
            <span className='pub-number'>{" (Publication # " + publication.node.pubNumber + ")"}</span>
          </li>
          ))}
          </ul>
        )}
        />
      </div>
      </div>
    </div>
    </div>
  </Layout>
  );
};

export default Index;
