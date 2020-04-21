import React from "react";
import { Link } from "@reach/router"
import Img from 'gatsby-image/withIEPolyfill';

const _ = require("lodash");

const NewsTeaser = ({teaser}) => {
  const teaserData = teaser.node.frontmatter;
  // let slug = "/news/releases/" + _.kebabCase(teaserData.title) + "/";
  let slug = `${ "/news/releases/" + (teaserData.slug === null ? _.kebabCase(teaserData.title) : teaserData.slug) }/`;
  return (
    <div className="teaser-block">
      <div className="image-wrapper">
        <Link className="image-link" to={slug}>
          <Img fluid={{...teaserData.teaser_image.childImageSharp.fluid, aspectRatio: 5 / 3.03 }} alt={teaserData.title} />
        </Link>
      </div>
      <div className="teaser-header">
        <h2 className="teaser-title"><Link to={slug}>{teaserData.title}</Link></h2>
        <p className="teaser-author">{teaserData.author}</p>
        <p className="teaser-date">{new Date(teaserData.date).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })}</p>
      </div>
      <div className="teaser-content">
        {teaserData.teaser.trim()}&nbsp;<Link to={slug}>More</Link>
      </div>
    </div>
  )
}

export default NewsTeaser
