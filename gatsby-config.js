const path = require('path');

module.exports = {
  siteMetadata: {
    title: `U.S. Naval Research Laboratory`,
    header: {
      navigation: [
        {
          title: 'About NRL',
          items: [
            { text: 'About Link 1', link: '/' },
            { text: 'ABout Link 2', link: '/' },
            { text: 'About Link 3', link: '/' },
          ],
        },
        {
          title: 'Research Areas',
          items: [
            { text: 'Research Link 1', link: '/' },
            { text: 'Research Link 2', link: '/' },
            { text: 'Research Link 3', link: '/' },
          ],
        },
        {
          title: 'News',
          items: [
            { text: 'News Link 1', link: '/' },
            { text: 'News Link 2', link: '/' },
            { text: 'News Link 3', link: '/' },
          ],
        },
        {
          title: 'Work With Us',
          items: [
            { text: 'Work Link 1', link: '/' },
            { text: 'Work Link 2', link: '/' },
            { text: 'Work Link 3', link: '/' },
          ],
        },
        {
          title: 'Labs & Facilites',
          items: [
            { text: 'Labs Link 1', link: '/' },
            { text: 'Labs Link 2', link: '/' },
            { text: 'Labs Link 3', link: '/' },
          ],
        },
      ],
    },
    footer: {
      navigation: [
        {
          title: 'Row 1',
          items: [
            { text: 'Department of the Navy', link: 'https://www.navy.mil' },
            { text: 'Office of Naval Research', link: 'https://www.onr.navy.mil' },
            { text: 'Navy Recruiting', link: 'https://www.navy.com' },
            { text: 'No Fear Act', link: 'http://www.secnav.navy.mil/donhr/Site/Pages/No-Fear-Act.aspx' },
          ],
        },
        {
          title: 'Row 2',
          items: [
            { text: 'Link Disclaimer', link: 'https://www.nrl.navy.mil/link-disclaimer' },
            { text: 'Privacy Policy', link: 'https://www.nrl.navy.mil/privacy-policy' },
            { text: 'webmaster@nrl.navy.mil', link: 'mailto:webmaster@nrl.navy.mil' },
            { text: 'FOIA', link: 'https://www.nrl.navy.mil/foia' },
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
