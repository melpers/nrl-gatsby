const path = require('path');

module.exports = {
  siteMetadata: {
    title: `U.S. Naval Research Laboratory`,
    header: {
      navigation: [
        {
          title: 'About NRL',
          items: [
            { text: 'Google Test Link', link: 'https://google.com', type: 'external' },
            { text: 'ABout Link 2', link: '/', type: 'internal' },
            { text: 'About Link 3', link: '/', type: 'internal' },
          ],
        },
        {
          title: 'Research Areas',
          items: [
            { text: 'Research Link 1', link: '/', type: 'internal' },
            { text: 'Research Link 2', link: '/', type: 'internal' },
            { text: 'Research Link 3', link: '/', type: 'internal' },
          ],
        },
        {
          title: 'News',
          items: [
            { text: 'News Link 1', link: '/', type: 'internal' },
            { text: 'News Link 2', link: '/', type: 'internal' },
            { text: 'News Link 3', link: '/', type: 'internal' },
          ],
        },
        {
          title: 'Work With Us',
          items: [
            { text: 'Work Link 1', link: '/', type: 'internal' },
            { text: 'Work Link 2', link: '/', type: 'internal' },
            { text: 'Work Link 3', link: '/', type: 'internal' },
          ],
        },
        {
          title: 'Labs & Facilites',
          items: [
            { text: 'Labs Link 1', link: '/', type: 'internal' },
            { text: 'Labs Link 2', link: '/', type: 'internal' },
            { text: 'Labs Link 3', link: '/', type: 'internal' },
          ],
        },
      ],
    },
    footer: {
      navigation: [
        {
          title: 'Row 1',
          items: [
            { text: 'Department of the Navy', link: 'https://www.navy.mil', type: 'external' },
            { text: 'Office of Naval Research', link: 'https://www.onr.navy.mil', type: 'external' },
            { text: 'Navy Recruiting', link: 'https://www.navy.com', type: 'external' },
            { text: 'No Fear Act', link: 'http://www.secnav.navy.mil/donhr/Site/Pages/No-Fear-Act.aspx', type: 'external' },
          ],
        },
        {
          title: 'Row 2',
          items: [
            { text: 'Link Disclaimer', link: 'https://www.nrl.navy.mil/link-disclaimer', type: 'external' },
            { text: 'Privacy Policy', link: 'https://www.nrl.navy.mil/privacy-policy', type: 'external' },
            { text: 'webmaster@nrl.navy.mil', link: 'mailto:webmaster@nrl.navy.mil', type: 'external' },
            { text: 'FOIA', link: 'https://www.nrl.navy.mil/foia', type: 'external' },
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
