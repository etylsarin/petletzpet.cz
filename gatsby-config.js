const pkg = require("./package.json")
const DESC =
  "Přešlapy Miloše Zemana v roli prezidenta 2013–2023 na časové ose: milosti, Čína a Rusko, spory o ústavu, Mynář a Nejedlý. U každého přešlapu jsou zdroje."

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
        name: `${pkg.description} | Přešlapy Miloše Zemana`,
        short_name: pkg.description,
        description: DESC,
        lang: "cs",
        start_url: `/`,
        background_color: `#fbfbfb`,
        theme_color: `#dc143c`,
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
        name: "preslapy",
        path: `./src/preslapy/`,
      },
      __key: "preslapy",
    },
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        // Build artifacts that must not be advertised to crawlers.
        excludes: ["/404/", "/404.html", "/offline-plugin-app-shell-fallback/"],
        query: `
          {
            allSitePage {
              nodes {
                path
                pageContext
              }
            }
          }
        `,
        resolveSiteUrl: () => pkg.homepage.replace(/\/$/, ""),
        // Event pages carry their `updated` date in the page context (see
        // gatsby-node.js), which gives Google a real lastmod to work with.
        serialize: ({ path, pageContext }) => ({
          url: path,
          ...(pageContext?.updated ? { lastmod: pageContext.updated } : {}),
        }),
      },
    },
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
