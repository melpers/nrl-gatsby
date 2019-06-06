const path = require('path');

module.exports = {
  siteMetadata: {
    title: `U.S. Naval Research Laboratory`,
    header: {
      secondaryLinks: [
        { text: 'Field Sites', link: '/' },
        { text: 'Visitor Info', link: '/' },
        { text: 'Contact NRL', link: '/' },
      ],
      navigation: [
        {
          title: 'Accomplishments',
          items: [
            { text: 'Awards & Recognition', link: '/' },
            { text: 'Timeline', link: '/' },
            { text: 'Systems', link: '/' },
          ],
        },
        {
          title: 'Research',
          items: [
            { text: 'Directorates & Divisions', link: '/' },
            { text: 'Nanoscience Institute', link: '/' },
            { text: 'Laboratory for Autonomous Systems Research', link: '/' },
          ],
        },
        {
          title: 'Careers',
          items: [
            { text: 'Opportunities', link: '/' },
            { text: 'Post Docs', link: '/' },
            { text: 'Students', link: '/' },
          ],
        },
        {
          title: 'About NRL',
          items: [
            { text: 'Mission', link: '/' },
            { text: 'History', link: '/' },
            { text: 'Commanding Officer', link: '/' },
          ],
        },
        {
          title: 'Doing Business',
          items: [
            { text: 'Tech Transfer', link: '/' },
            { text: 'NRL Supply Division', link: '/' },
            { text: 'Contracting Division', link: '/' },
          ],
        },
        {
          title: 'Public Affairs & Media',
          items: [
            { text: 'Public Affairs Office', link: '/' },
            { text: 'News Releases', link: '/' },
            { text: 'NRL Videos', link: '/' },
          ],
        },
      ],
    },
    footer: {
      secondaryLinks: [
        { text: 'Field Sites', link: '/' },
        { text: 'Visitor Info', link: '/' },
        { text: 'Contact NRL', link: '/' },
      ],
      navigation: [
        {
          title: 'Accomplishments',
          items: [
            { text: 'Awards & Recognition', link: '/' },
            { text: 'Timeline', link: '/' },
            { text: 'Systems', link: '/' },
          ],
        },
        {
          title: 'Research',
          items: [
            { text: 'Directorates & Divisions', link: '/' },
            { text: 'Nanoscience Institute', link: '/' },
            { text: 'Laboratory for Autonomous Systems Research', link: '/' },
          ],
        },
        {
          title: 'Careers',
          items: [
            { text: 'Opportunities', link: '/' },
            { text: 'Post Docs', link: '/' },
            { text: 'Students', link: '/' },
          ],
        },
        {
          title: 'About NRL',
          items: [
            { text: 'Mission', link: '/' },
            { text: 'History', link: '/' },
            { text: 'Commanding Officer', link: '/' },
          ],
        },
        {
          title: 'Doing Business',
          items: [
            { text: 'Tech Transfer', link: '/' },
            { text: 'NRL Supply Division', link: '/' },
            { text: 'Contracting Division', link: '/' },
          ],
        },
        {
          title: 'Public Affairs & Media',
          items: [
            { text: 'Public Affairs Office', link: '/' },
            { text: 'News Releases', link: '/' },
            { text: 'NRL Videos', link: '/' },
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
