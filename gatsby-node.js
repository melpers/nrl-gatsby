const path = require('path');
const _ = require("lodash");
// const webpack = require('webpack');

const uswdsRoot = 'node_modules/uswds';
const shims = 'shims';

module.exports = {
  onCreateWebpackConfig: ({ stage, actions }) => {
    actions.setWebpackConfig({
      resolve: {
        alias: {
          // Until uswds exports the components individually
          uswds_components: path.resolve(
            __dirname,
            uswdsRoot,
            'src/js/components'
          ),
          uswds_images: path.resolve(__dirname, uswdsRoot, 'dist/img'),
          // Until uswds exports the polyfills individually, though this doesn't totally fix things
          // because some polyfills are included no matter what, see below
          uswds_polyfills: path.resolve(
            __dirname,
            uswdsRoot,
            'src/js/polyfills'
          ),
          // until the `uswds-react` library is created, just a helper for now
          'uswds-react': path.resolve(__dirname, 'src/lib'),
          /**
           * Reroute and shim some polyfills to be able to statically render
           */
          'element-closest': path.resolve(__dirname, shims, 'element-closest'),
          'element-closest-orig': path.resolve(
            __dirname,
            'node_modules/element-closest'
          ),
          'elem-dataset': path.resolve(__dirname, shims, 'elem-dataset'),
          'elem-dataset-orig': path.resolve(
            __dirname,
            'node_modules/elem-dataset'
          ),
        },
      },
    });
  },
};

module.exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
    }
    type Frontmatter {
      active: Boolean
      code: Int
      code_name: String
      email: String
      fax: String
      hero_color: String
      hero_size: String
      name: String
      navTitle: String
      order: Int
      path: String
      phone: String
      sidebar_exclude: Boolean
      template: String
      title: String
      date: Date
      teaser: String
      categories: [String]
    }
  `
  createTypes(typeDefs)
}

module.exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;
  if(node.internal.type === "MarkdownRemark") {
      createNodeField({
          node
      });
  }
}

module.exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const coreCapabilitiesTemplate = path.resolve('./src/templates/core-capabilities.js');
  const coreCapabilitiesResponse = await graphql(`
    query {
      allMarkdownRemark(filter: {frontmatter: {template: {eq: "core-capabilities"}}}) {
        edges {
          node {
            frontmatter {
              path
            }
            id
          }
        }
      }
    }
  `);
  coreCapabilitiesResponse.data.allMarkdownRemark.edges.forEach(edge => {
    createPage({
        component: coreCapabilitiesTemplate,
        path: edge.node.frontmatter.path,
        context: {
            id: edge.node.id
        }
    });
  });

  const facilitiesTemplate = path.resolve('./src/templates/facilities.js');
  const facilitiesResponse = await graphql(`
    query {
      allMarkdownRemark(filter: {frontmatter: {template: {eq: "facilities"}}}) {
        edges {
          node {
            frontmatter {
              path
            }
            id
          }
        }
      }
    }
  `);
  facilitiesResponse.data.allMarkdownRemark.edges.forEach(edge => {
    createPage({
        component: facilitiesTemplate,
        path: edge.node.frontmatter.path,
        context: {
            id: edge.node.id
        }
    });
  });

  const placeholderTemplate = path.resolve('./src/templates/placeholder.js');
  const placeholderResponse = await graphql(`
    query {
      allMarkdownRemark(filter: {frontmatter: {template: {eq: "placeholder"}}}) {
        edges {
          node {
            frontmatter {
              path
            }
            id
          }
        }
      }
    }
  `);
  placeholderResponse.data.allMarkdownRemark.edges.forEach(edge => {
    createPage({
        component: placeholderTemplate,
        path: edge.node.frontmatter.path,
        context: {
            id: edge.node.id
        }
    });
  });

  const divisionLandingTemplate = path.resolve('./src/templates/division-landing.js');
  const divisionLandingResponse = await graphql(`
    query {
      allMarkdownRemark(filter: {frontmatter: {template: {eq: "division-landing"}}}) {
        edges {
          node {
            frontmatter {
              path
              code
            }
            id
          }
        }
      }
    }
  `);
  divisionLandingResponse.data.allMarkdownRemark.edges.forEach(edge => {
    createPage({
        component: divisionLandingTemplate,
        path: edge.node.frontmatter.path,
        context: {
            id: edge.node.id,
            code: edge.node.frontmatter.code
        }
    });
  });

  const publicationsTemplate = path.resolve('./src/templates/publications.js');
  const publicationsResponse = await graphql(`
    query {
      allMarkdownRemark(filter: {frontmatter: {template: {eq: "publications"}}}) {
        edges {
          node {
            frontmatter {
              path
              code
            }
            id
          }
        }
      }
    }
  `);
  publicationsResponse.data.allMarkdownRemark.edges.forEach(edge => {
    createPage({
        component: publicationsTemplate,
        path: edge.node.frontmatter.path,
        context: {
            id: edge.node.id,
            code: edge.node.frontmatter.code
        }
    });
  });

  const newsTemplate = path.resolve('./src/templates/news.js');
  const newsResponse = await graphql(`
    query {
      allMarkdownRemark(filter: {frontmatter: {template: {eq: "news"}}}) {
        edges {
          node {
            frontmatter {
              title
            }
            id
          }
        }
      }
    }
  `);
  newsResponse.data.allMarkdownRemark.edges.forEach(edge => {
    let slug = `${_.kebabCase(edge.node.frontmatter.title)}/`
    console.log(slug);
    createPage({
        component: newsTemplate,
        path: `/news/releases/${slug}`,
        context: {
            id: edge.node.id,
        }
    });
  });

}