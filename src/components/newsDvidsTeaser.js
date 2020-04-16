import React from "react";
import { Link } from 'gatsby';
import Img from 'gatsby-image/withIEPolyfill';

// const _ = require("lodash");

/*
node {
  title
  description
  date_published
  formatted_credit
  teaser_image {
    dvidsImage {
      childImageSharp {
        fluid(maxWidth: 1200) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
  slug
  id
}
*/

const NewsDvidsTeaser = ({teaser}) => {
  const teaserData = teaser.node;
  const slug = "/news/dvids-releases/" + teaserData.slug;

  return (
    <div className="teaser-block">
      <div className="image-wrapper">
        <Link className="image-link" to={slug}>
          <Img fluid={{...teaserData.teaser_image.dvidsImage.childImageSharp.fluid, aspectRatio: 5 / 3.03 }} alt={teaserData.teaser_image.description} />
        </Link>
      </div>
      <div className="teaser-header">
        <h2 className="teaser-title"><Link to={slug}>{teaserData.title}</Link></h2>
        <p className="teaser-author">{teaserData.formatted_credit}</p>
        <p className="teaser-date">{new Date(teaserData.date_published).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })}</p>
      </div>
      <div className="teaser-content">
        {teaserData.description.trim()}&nbsp;<Link to={slug}>More</Link>
      </div>
    </div>
  )
}

export default NewsDvidsTeaser
