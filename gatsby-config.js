const path = require('path');

module.exports = {
  siteMetadata: {
    title: `U.S. Naval Research Laboratory`,
    header: {
      navigation: [
        {
          title: 'About',
          items: [
            { text: 'About Link 1', link: 'https://google.com', type: 'external', depth: '0' },
            { text: 'About Link 2', link: 'https://google.com', type: 'external', depth: '0' },
            { text: 'About Link 3', link: 'https://google.com', type: 'external', depth: '0' },
            { text: 'About Link 4', link: 'https://google.com', type: 'external', depth: '0' },
            { text: 'About Link 5', link: 'https://google.com', type: 'external', depth: '0' },
            { text: 'About Link 6', link: 'https://google.com', type: 'external', depth: '0' },
            { text: 'About Link 7', link: 'https://google.com', type: 'external', depth: '0' },
            { text: 'About Link 8', link: '/', type: 'internal', depth: '0' },
            { text: 'About Link 9', link: '/', type: 'internal', depth: '0' },
          ],
        },
        {
          title: 'Research Areas',
          items: [
            { text: 'Research Link 1', link: '/', type: 'internal', depth: '0' },
            { text: 'Research Link 2', link: '/', type: 'internal', depth: '0' },
            { text: 'Research Link 3', link: '/', type: 'internal', depth: '0' },
          ],
        },
        {
          title: 'News',
          items: [
            { text: 'News Link 1', link: '/', type: 'internal', depth: '0' },
            { text: 'News Link 2', link: '/', type: 'internal', depth: '0' },
            { text: 'News Link 3', link: '/', type: 'internal', depth: '0' },
          ],
        },
        {
          title: 'Work With Us',
          items: [
            { text: 'Work Link 1', link: '/', type: 'internal', depth: '0' },
            { text: 'Work Link 2', link: '/', type: 'internal', depth: '0' },
            { text: 'Work Link 3', link: '/', type: 'internal', depth: '0' },
          ],
        },
        {
          title: 'Labs & Facilites',
          items: [
            { text: 'Labs Link 1', link: '/', type: 'internal', depth: '0' },
            { text: 'Labs Link 2', link: '/', type: 'internal', depth: '0' },
            { text: 'Labs Link 3', link: '/', type: 'internal', depth: '0' },
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
          ],
        },
        {
          title: 'Row 2',
          items: [
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
    `gatsby-transformer-yaml`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sass`,
  ],
};
