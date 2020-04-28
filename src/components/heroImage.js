import React from "react";
import Img from 'gatsby-image/withIEPolyfill';

const HeroImage = (props) => {
  const sizeClass = "hero-block-" + props.frontmatter.hero_size;
  return (
    <div className={"hero-block " + sizeClass }>
      <Img fluid={props.frontmatter.hero_image.childImageSharp.fluid} alt={props.frontmatter.title + " page"} />
      {props.children}
    </div>
  )
}

export default HeroImage
