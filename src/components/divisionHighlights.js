import React from 'react';
import { graphql, useStaticQuery } from "gatsby";
import { Link } from "@reach/router"

import Img from "gatsby-image/withIEPolyfill";

const DivisionHighlights = (props) => {
  const data = useStaticQuery(graphql`
  query {
    newsImageLg: file(relativePath: { eq: "highlights-news-lg.jpg" }) {
    childImageSharp {
      fluid(maxWidth: 800) {
      ...GatsbyImageSharpFluid_withWebp
      }
    }
    },
  }
  `)

  return (
    <div className="highlights-block-wrapper">
      <h2>Highlights</h2>
      <div className="highlights-block">
      <div className="article-preview-block">
        {/*
        TODO: Change this into a component.
            This will replace the static newsImageLg query.
            Pass in the props.code number to fetch the latest news article info?
        */}
        <div className="image-box">
        <Img fluid={data.newsImageLg.childImageSharp.fluid} />
        <div className="image-box-content">
          <h3>Latest Article Title Goes Here</h3>
          <p>The U.S. Naval Research Laboratory and the U.S. Naval Academy Museum combined resources to tell the story of how the Navy ushered in our nation’s presence in space... Read More</p>
        </div>
        </div>
      </div>

      <div className="section-grid">
        <div className="image-box-wrapper">
        <Link className="image-box-link" to="/news">
          <div className="image-box">
          <Img fluid={props.news_image.childImageSharp.fluid} />
          <div className="image-box-content">
            <h3>Division News</h3>
          </div>
          </div>
        </Link>
        </div>

        <div className="image-box-wrapper">
        <Link className="image-box-link" to="/videos">
          <div className="image-box">
          <Img fluid={props.videos_image.childImageSharp.fluid} />
          <div className="image-box-content">
            <h3>Division Videos</h3>
          </div>
          </div>
        </Link>
        </div>

        <div className="image-box-wrapper">
        <Link className="image-box-link" to="/areas-of-research/spacecraft-engineering/publications">
          <div className="image-box">
          <Img fluid={props.publications_image.childImageSharp.fluid} />
          <div className="image-box-content">
            <h3>Publications</h3>
          </div>
          </div>
        </Link>
        </div>

        <div className="image-box-wrapper">
        <Link className="image-box-link" to="/areas-of-research/spacecraft-engineering/research">
          <div className="image-box">
          <Img fluid={props.research_image.childImageSharp.fluid} />
          <div className="image-box-content">
            <h3>Research</h3>
          </div>
          </div>
        </Link>
        </div>
      </div>
      </div>
    </div>
  )
}

export default DivisionHighlights