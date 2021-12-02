/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  siteMetadata: {
    title: `ESSENTIALS`,
    description: `おいしい食材と食事を探究するサイト`,
    lang: `ja`,
    siteUrl: `https://reverent-edison-2a3e92.netlify.app`,
    locale: `ja_JP`,
    fbappid: `xxxxxxxxxxxxxxx`,
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images/`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `ESSENTIALS エッセンシャルズ`,
        short_name: `ESSENTIALS`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#477294`,
        display: `standalone`,
        icon: `src/images/icon.png`,
        icon_options: {
          purpose: `maskable`,
        },
      },
    },
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-source-microcms`,
      options: {
        apiKey: process.env.microCMS_API_KEY,
        serviceId: "essentials",
        apis: [
          {
            endpoint: "blog",
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-microcms`,
      options: {
        apiKey: process.env.microCMS_API_KEY,
        serviceId: "essentials",
        apis: [
          {
            endpoint: "category",
          },
        ],
      },
    },
  ],
}
