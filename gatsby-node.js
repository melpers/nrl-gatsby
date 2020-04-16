const path = require('path');
const _ = require("lodash");

const uswdsRoot = 'node_modules/uswds';
const shims = 'shims';

module.exports = {
  onCreateWebpackConfig: ({ scategorye, actions }) => {
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
    type dataYaml implements Node {
        metadata: yamlMetadata
    }
    type yamlMetadata {
        code: Int
        template: String
    }
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
      image_float: String
      name: String
      nav_title: String
      nav_order: Int
      order: Int
      path: String
      phone: String
      sidebar_exclude: Boolean
      slug: String
      template: String
      title: String
      date: Date
      teaser: String
      categories: [String]
    }
    type DvidsPressReleases implements Node {
        dvids_id: String
        title: String
        slug: String
        description: String
        body: String
        keywords: String
        date_published: Date
        date: Date
        category: String
        unit_name: String
        branch: String
        timestamp: Date
        url: String
        formatted_credit: String
        related_video: [dvidsVideo]
        teaser_image___NODE: Node!
        related_images___NODE: Node!
    }
    type dvidsVideo {
        id: String
        type: String
        title: String
        description: String
        keywords: String
        date_published: Date
        date: Date
        category: String
        unit_id: String
        unit_name: String
        branch: String
        timestamp: Date
        image: String
        url: String
        aspect_ratio: String
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

  /* **** BASE TEMPLATES ****
   * This sets up the most commonly needed context information for most templates.
   * Any exceptions created below need to be added to the template filter.
   * 
   * Cannot just pass in ID to get this information later, due to needing it for the Sidebar
   * and not all pages having markdown to pull from, for example Categories below.
   * 
   * Only pages that do not need this context should be created w/o base templates, i.e. the 404 page.
   * These types of pages should probably also be explicity excluded from the sidebar (sidebar_exclude: true).
   ************************** */
  const baseResponse = await graphql(`
    query {
      allMarkdownRemark(filter: {
        frontmatter: {
          template: {nin: [null, "news-article", "news-video", "division-landing", "publications", "capabilities-landing", "facilities-landing", "error-404"]},
          path: {ne: null}
        }}) {
        edges {
          node {
            frontmatter {
              path
              title
              sidebar_exclude
              nav_order
              nav_title
              template
            }
            id
          }
        }
      }
    }
  `);
  baseResponse.data.allMarkdownRemark.edges.forEach(edge => {
    let baseTemplate = path.resolve('./src/templates/' + edge.node.frontmatter.template + '.js');
    createPage({
        component: baseTemplate,
        path: edge.node.frontmatter.path,
        context: {
            id: edge.node.id,
            sidebar_exclude: edge.node.sidebar_exclude,
            title: edge.node.frontmatter.title,
            nav_title: edge.node.frontmatter.nav_title,
            nav_order: edge.node.frontmatter.nav_order
        }
    });
  });

  /* **** BASE + CODE TEMPLATES ****
   * As base above plus 1 additional context item for the code of the branch.
   ************************** */
  const baseCodeResponse = await graphql(`
    query {
      allMarkdownRemark(filter: {frontmatter: {template: {in: ["division-landing", "publications", "capabilities-landing", "facilities-landing"]}}}) {
        edges {
          node {
            frontmatter {
              path
              code
              sidebar_exclude
              title
              nav_title
              nav_order
              template
            }
            id
          }
        }
      }
    }
  `);
  baseCodeResponse.data.allMarkdownRemark.edges.forEach(edge => {
    let baseCodeTemplate = path.resolve('./src/templates/' + edge.node.frontmatter.template + '.js');
    createPage({
        component: baseCodeTemplate,
        path: edge.node.frontmatter.path,
        context: {
            id: edge.node.id,
            code: edge.node.frontmatter.code,
            sidebar_exclude: edge.node.sidebar_exclude,
            title: edge.node.frontmatter.title,
            nav_title: edge.node.frontmatter.nav_title,
            nav_order: edge.node.frontmatter.nav_order,
        }
    });
  });

  // **** NEWS RELEASES ****
  const newsTemplate = path.resolve('./src/templates/news-article.js');
  const newsResponse = await graphql(`
    query {
      allMarkdownRemark(filter: {frontmatter: {template: {eq: "news-article"}}}) {
        edges {
          node {
            frontmatter {
              title
              slug
            }
            id
          }
        }
      }
    }
  `);
  newsResponse.data.allMarkdownRemark.edges.forEach(edge => {
    let slug = `${ edge.node.frontmatter.slug === null ? _.kebabCase(edge.node.frontmatter.title) : edge.node.frontmatter.slug }/`;
    createPage({
        component: newsTemplate,
        path: `/news/releases/${slug}`,
        context: {
            id: edge.node.id,
            sidebar_exclude: true
        }
    });
  });

    // **** DVIDS NEWS RELEASES ****
    const allDvidsPressReleases = path.resolve('./src/templates/dvids-releases.js');
    const newsDvidsResponse = await graphql(`
        query {
            allDvidsPressReleases {
                edges {
                    node {
                        id
                        slug
                        title
                    }
                }
            }
        }
    `);
    newsDvidsResponse.data.allDvidsPressReleases.edges.forEach(edge => {
      createPage({
          component: allDvidsPressReleases,
          path: `/news/dvids-releases/${edge.node.slug}`,
          context: {
              id: edge.node.id,
              sidebar_exclude: true
          }
      });
    });

  // **** VIDEOS ****
  const videoTemplate = path.resolve('./src/templates/news-video.js');
  const videoResponse = await graphql(`
    query {
      allMarkdownRemark(filter: {frontmatter: {template: {eq: "news-video"}}}) {
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
  videoResponse.data.allMarkdownRemark.edges.forEach(edge => {
    let slug = `${_.kebabCase(edge.node.frontmatter.title)}/`
    createPage({
        component: videoTemplate,
        path: `/news/videos/${slug}`,
        context: {
            id: edge.node.id,
            sidebar_exclude: true
        }
    });
  });

  // **** MISC SIDEBAR EXCLUDE ****
  const excludeCodeResponse = await graphql(`
  query {
    allMarkdownRemark(filter: {frontmatter: {template: {in: ["error-404"]}}}) {
      edges {
        node {
          frontmatter {
            path
            template
          }
          id
        }
      }
    }
  }
`);
excludeCodeResponse.data.allMarkdownRemark.edges.forEach(edge => {
  let excludeCodeTemplate = path.resolve('./src/templates/' + edge.node.frontmatter.template + '.js');
  createPage({
      component: excludeCodeTemplate,
      path: edge.node.frontmatter.path,
      context: {
          id: edge.node.id,
          sidebar_exclude: true,
      }
  });
});

  // **** CATEGORIES ****
  const categoryTemplate = path.resolve("src/templates/categories.js");
  let categories = [];

  const categoriesResponse = await graphql(`
    {
      allMarkdownRemark (
        filter: { 
          frontmatter: { categories: { ne: null } }
        }
      ) {
        edges {
          node {
            frontmatter {
              categories
            }
          }
        }
      }
    }
  `);

  const keywordsResponse = await graphql(`
  {
    allDvidsPressReleases (
        filter: {
            keywords: {ne: "null"}
        }
    ) {
        edges {
          node {
            keywords
          }
        }
      }
  }
  `);

  const newsPosts = categoriesResponse.data.allMarkdownRemark.edges;
  // Iterate through each post, putting all found categories into `categories`
  _.each(newsPosts, edge => {
    if (_.get(edge, "node.frontmatter.categories")) {
      categories = categories.concat(edge.node.frontmatter.categories)
    }
  });

  const dvidsPosts = keywordsResponse.data.allDvidsPressReleases.edges;
  // Iterate through each post, putting all found categories into `categories`
  _.each(dvidsPosts, edge => {
    if (_.get(edge, "node.keywords")) {
      keywordsArray = _.split(edge.node.keywords, ",");
      keywordsArray.forEach (keyword => {
        categories = categories.concat(_.trim(keyword));
      })
    }
  });

  // Eliminate duplicate categories
  categories = _.uniq(categories)

  // Make category pages
  categories.forEach(category => {
    let slug = `/news/categories/${_.kebabCase(category)}/`;
    let title = category.charAt(0).toUpperCase() + category.slice(1);
    let nav_title = title.replace(" and ", " & ");
    let categoryRegex = "/" + category + "/"
    createPage({
      path: slug,
      component: categoryTemplate,
      context: {
        category,
        categoryRegex,
        title,
        nav_title
      },
    })
  })

}
