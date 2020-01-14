// See https://github.com/gatsbyjs/gatsby/issues/4718 for CJS vs. ES6 mixing issues
import "./src/styles/index.scss"
import { wrapRootElement } from "./wrapRootElement"

const onClientEntry = () => {
    try {
      require('uswds_polyfills');
    } catch (e) {
      // do nothing
    }
}

export { wrapRootElement, onClientEntry }