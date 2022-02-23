module.exports = {
  siteMetadata: {
    title: "Miloš Zeman: pět let zpět",
    description: "Největší přešlapy současného prezidenta na časové ose.",
    author: "@etylsarin",
    siteUrl: "https://www.petletzpet.cz/",
  },
  plugins: [
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-plugin-svgr',
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
    {
      resolve: require.resolve(`@nrwl/gatsby/plugins/nx-gatsby-ext-plugin`),
      options: {
        path: __dirname,
      },
    },
    `gatsby-plugin-sharp`,
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        excludes: ["/chapter-*"],
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        defaultLayouts: {
          posts: require.resolve("./src/components/post-layout.tsx"),
          default: require.resolve("./src/components/page-layout.tsx")
        }
      }
    },
  ],
}
