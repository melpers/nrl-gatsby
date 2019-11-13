const path = require('path');

module.exports = {
  siteMetadata: {
    title: `U.S. Naval Research Laboratory`,
    header: {
      navigation: [
        {
          title: 'About',
          items: [
            { text: 'About NRL', link: '/about', type: 'internal', depth: '0' },
            { text: 'Mission', link: '/about', type: 'internal', depth: '1' },
            { text: 'Accomplishments', link: '/about', type: 'internal', depth: '0' },
            { text: 'Leadership', link: '/about', type: 'internal', depth: '0' },
            { text: 'History', link: 'https://google.com', type: 'external', depth: '0' },
          ],
        },
        {
          title: 'Our Work',
          items: [
            { text: 'Our Work Link 1', link: '/', type: 'internal', depth: '0' },
            { text: 'Our Work Link 2', link: '/', type: 'internal', depth: '0' },
            { text: 'Our Work Link 3', link: '/', type: 'internal', depth: '0' },
          ],
        },
        {
          title: 'News & Media',
          items: [
            { text: 'News Link 1', link: '/', type: 'internal', depth: '0' },
            { text: 'News Link 2', link: '/', type: 'internal', depth: '0' },
            { text: 'News Link 3', link: '/', type: 'internal', depth: '0' },
          ],
        },
        {
          title: 'Doing Business',
          items: [
            { text: 'Doing Business Link 1', link: '/', type: 'internal', depth: '0' },
            { text: 'Doing Business Link 2', link: '/', type: 'internal', depth: '0' },
            { text: 'Doing Business Link 3', link: '/', type: 'internal', depth: '0' },
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
        // {
        //   title: 'Row 2',
        //   items: [
        //     { text: 'Link Disclaimer', link: 'https://www.nrl.navy.mil/link-disclaimer', type: 'external', depth: '0' },
        //     { text: 'Privacy Policy', link: 'https://www.nrl.navy.mil/privacy-policy', type: 'external', depth: '0' },
        //     { text: 'webmaster@nrl.navy.mil', link: 'mailto:webmaster@nrl.navy.mil', type: 'external', depth: '0' },
        //     { text: 'FOIA', link: 'https://www.nrl.navy.mil/foia', type: 'external', depth: '0' },
        //   ],
        // },
      ],
    },
  },
  // Note: it must *not* have a trailing slash.
  pathPrefix: process.env.BASEURL || '/',
  plugins: [
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
              maxWidth: 1200,
            },
          },
        ],
      },
    },
    `gatsby-transformer-yaml`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-resolve-src`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sass`,
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['Open Sans: 400, 600']
        }
      }
    },
  ],
};
