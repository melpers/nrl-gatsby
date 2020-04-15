require("dotenv").config({
  path: `.env`,
})

const path = require('path');

module.exports = {
  siteMetadata: {
    title: `U.S. Naval Research Laboratory`,
    description: `NRL operates as the Navy's full-spectrum corporate laboratory, conducting a broadly based multidisciplinary program of scientific research and advanced technological development directed toward maritime applications of new and improved materials, techniques, equipment, systems and ocean, atmospheric, and space sciences and related technologies.`,
    keywords: `NRL, US Navy, US Naval Research`,
    siteUrl: 'https://www.nrl.navy.mil/', //Used by the sitemap plugin
    header: {
      navigation: [
        {
          title: 'About',
          items: [
            { text: 'About NRL', link: '/about', type: 'internal', depth: '0' },
            { text: 'Accomplishments', link: '/about/accomplishments', type: 'internal', depth: '0' },
            { text: 'Leadership', link: '/about/leadership', type: 'internal', depth: '0' },
            { text: 'History', link: '/about/history', type: 'internal', depth: '0' },
          ],
        },
        {
          title: 'Our Work',
          items: [
            { text: 'Areas of Research', link: '/areas-of-research', type: 'internal', depth: '0' },
              { text: 'Autonomous & Unmanned Systems', link: '/areas-of-research', type: 'internal', depth: '1' },
              { text: 'Chemical & Biological Sciences', link: '/areas-of-research', type: 'internal', depth: '1' },
              { text: 'Electronic Warfare', link: '/areas-of-research', type: 'internal', depth: '1' },
              { text: 'Environments', link: '/areas-of-research', type: 'internal', depth: '1' },
              { text: 'Information Sciences', link: '/areas-of-research', type: 'internal', depth: '1' },
              { text: 'Materials', link: '/areas-of-research', type: 'internal', depth: '1' },
              { text: 'Nanotechnology', link: '/areas-of-research', type: 'internal', depth: '1' },
              { text: 'Power & Energy', link: '/areas-of-research', type: 'internal', depth: '1' },
              { text: 'Spacecraft Engineering', link: '/areas-of-research/spacecraft-engineering', type: 'internal', depth: '1' },
                { text: 'Highlights', link: '/areas-of-research/spacecraft-engineering/highlights', type: 'internal', depth: '2' },
                { text: 'Core Capabilities', link: '/areas-of-research/spacecraft-engineering/core-capabilities', type: 'internal', depth: '2' },
                { text: 'Facilities', link: '/areas-of-research/spacecraft-engineering/facilities', type: 'internal', depth: '2' },
                { text: 'Publications', link: '/areas-of-research/spacecraft-engineering/publications', type: 'internal', depth: '2' },
            { text: 'Labs & Facilities', link: '/labs-and-facilities', type: 'internal', depth: '0' },
              { text: 'Nanoscience Institute', link: '/', type: 'internal', depth: '1' },
              { text: 'Space Chamber', link: '/', type: 'internal', depth: '1' },
              { text: 'Autonomous Systems', link: '/', type: 'internal', depth: '1' },
            { text: 'VSX-1', link: '/', type: 'internal', depth: '1' },
          ],
        },
        {
          title: 'News & Media',
          items: [
            { text: 'News', link: '/news', type: 'internal', depth: '0' },
            { text: 'Videos', link: '/news/videos', type: 'internal', depth: '0' },
            { text: 'Photo Gallery', link: '/news/photo-gallery', type: 'internal', depth: '0' },
          ],
        },
        {
          title: 'Doing Business',
          items: [
            { text: 'Doing Business', link: '/doing-business', type: 'internal', depth: '0' },
            { text: 'Tech Transfer', link: '/techtransfer', type: 'internal', depth: '0' },
            { text: 'NRL Supply', link: '/doing-business/supply-division', type: 'internal', depth: '0' },
            { text: 'Contracting', link: '/doing-business/contracting-division', type: 'internal', depth: '0' },
            { text: 'Small Business', link: '/doing-business/small-business', type: 'internal', depth: '0' },
          ],
        },
        {
          title: 'Careers',
          items: [
            { text: 'Careers Link 1', link: '/', type: 'internal', depth: '0' },
            { text: 'Careers Link 2', link: '/', type: 'internal', depth: '0' },
            { text: 'Careers Link 3', link: '/', type: 'internal', depth: '0' },
          ],
        },
        {
          title: 'Contact',
          items: [
            { text: 'Contact Link 1', link: '/', type: 'internal', depth: '0' },
            { text: 'Contact Link 2', link: '/', type: 'internal', depth: '0' },
            { text: 'Contact Link 3', link: '/', type: 'internal', depth: '0' },
          ],
        },
      ],
    },
    footer: {
      navigation: [
        {
          title: 'Row 1',
          items: [
            { text: 'Department of the Navy', link: 'https://www.navy.mil', type: 'external', depth: '0' },
            { text: 'Office of Naval Research', link: 'https://www.onr.navy.mil', type: 'external', depth: '0' },
            { text: 'Navy Recruiting', link: 'https://www.navy.com', type: 'external', depth: '0' },
            { text: 'No Fear Act', link: 'http://www.secnav.navy.mil/donhr/Site/Pages/No-Fear-Act.aspx', type: 'external', depth: '0' },
            { text: 'Link Disclaimer', link: 'https://www.nrl.navy.mil/link-disclaimer', type: 'external', depth: '0' },
            { text: 'Privacy Policy', link: 'https://www.nrl.navy.mil/privacy-policy', type: 'external', depth: '0' },
            { text: 'webmaster@nrl.navy.mil', link: 'mailto:webmaster@nrl.navy.mil', type: 'external', depth: '0' },
            { text: 'FOIA', link: 'https://www.nrl.navy.mil/foia', type: 'external', depth: '0' },
          ],
        },
      ],
    },
  },
  // Note: it must *not* have a trailing slash.
  pathPrefix: process.env.BASEURL || '/',
  plugins: [
    {
      resolve: 'gatsby-source-dvids-images',
      options: {
          unit: 'NRL',
          key: process.env.DVIDS_KEY
      }
    },
    {
        resolve: 'gatsby-source-dvids-press-releases',
        options: {
            unit: 'NRL',
            key: process.env.DVIDS_KEY
        }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'data',
        path: path.join(__dirname, `src`, `data`),
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: path.join(__dirname, `src`, `images`),
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'pages',
        path: path.join(__dirname, `src`, `pages`),
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'emergency',
        path: path.join(__dirname, `src`, `emergency`),
      },
    },
    {
      resolve: `gatsby-plugin-remote-images`,
      /*
          * NOTE: When you have nested results the image path does not work with a "results.image" format.
          * You need to set the nodeType to the parent of the field you need to reference for the path.
          * i.e. given this query:
              alldvidsImage {
                  edges {
                      node {
                          results {
                          image
                          }
                      }
                  }
              }
          * you need to set the options like so:
              nodeType: 'results',
              imagePath: 'image',
          * and NOT like
              nodeType: 'dvidsImage',
              imagePath: 'results.image',
      */
      options: {
          nodeType: 'DvidsImage',
          imagePath: 'image_url',
          // OPTIONAL: Name you want to give new image field on the node.
          // Defaults to 'localImage'.
          name: 'dvidsImage',
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        // CommonMark mode (default: true)
        commonmark: true,
        // Footnotes mode (default: true)
        footnotes: true,
        // Pedantic mode (default: true)
        pedantic: true,
        // GitHub Flavored Markdown mode (default: true)
        gfm: true,
        // Plugins configs
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              quality: 80,
              maxWidth: 1200,
              linkImagesToOriginal: true
            },
          },
        ],
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-yaml`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-netlify-cms`,
    `gatsby-plugin-resolve-src`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-catch-links`,
    `gatsby-background-image`,
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Open Sans`,
            variants: [`300`,`400`,`600`]
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-html-attributes',
      options: {
          lang: 'en'
      }
    },
    `gatsby-plugin-sitemap`, // Defaults to /sitemap.xml
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: `https://www.nrl.navy.mil`,
      },
    },
  ],
};
