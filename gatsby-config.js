const pkg = require("./package.json")
const DESC = `Čeho všeho jsme byli svědky za posledních 5 let úřadování českého prezidenta na hradě? Nabízíme přehled novinových zpráv s největšími přešlapy na časové ose.`

module.exports = {
  siteMetadata: {
    title: pkg.description,
    description: DESC,
    author: pkg.author,
    siteUrl: pkg.homepage,
  },
  plugins: [
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: pkg.description,
        short_name: pkg.name,
        description: DESC,
        start_url: `/`,
        background_color: `#fbfbfb`,
        theme_color: `#fbfbfb`,
        display: `standalone`,
        icon: "src/images/icon.png",
      },
    },
    "gatsby-plugin-sass",
    {
      resolve: "gatsby-plugin-svgr",
      options: {
        svgo: false,
        ref: true,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `./src/images/`,
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: `./src/pages/`,
      },
      __key: "pages",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "posts",
        path: `./src/posts/`,
      },
      __key: "posts",
    },
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-offline`,
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 550,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: ["G-1DTH85EV1J"],
        gtagConfig: {
          anonymize_ip: true,
        },
        pluginConfig: {
          head: false,
        },
      },
    },
  ],
}
