// See https://github.com/gatsbyjs/gatsby/issues/4718 for CJS vs. ES6 mixing issues
import "./src/styles/index.scss"
import { wrapRootElement } from "./wrapRootElement"

const onClientEntry = () => {
  try {
    require('uswds_polyfills');
  } catch (e) {
    // do nothing
  }
  // IntersectionObserver polyfill for gatsby-background-image (Safari, IE)
  if (!(`IntersectionObserver` in window)) {
    require(`intersection-observer`);
  }
}

export { wrapRootElement, onClientEntry }