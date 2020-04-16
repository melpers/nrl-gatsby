import React from 'react';
import Img from 'gatsby-image/withIEPolyfill'

const SocialIcon = ({ data }) => {

  const socialURLs = {
  "facebook": "https://www.facebook.com/USNRL",
  "linked-in": "http://www.linkedin.com/company/usnrl",
  "twitter": "https://twitter.com/usnrl/",
  "youtube": "https://www.youtube.com/user/USNRL"
  }

  const height = 24;
  const width = height * data.node.childImageSharp.fluid.aspectRatio;
  
  return (
  <a href={socialURLs[data.node.name]} className="social-icon" target="_blank" rel="noopener noreferrer" style={{ width: width+"px" }}>
    <Img 
      fluid = {data.node.childImageSharp.fluid}
      alt = {data.node.name}
    />
  </a>
  )
}

export default SocialIcon;