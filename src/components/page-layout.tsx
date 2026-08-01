import * as React from "react"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql, Link } from "gatsby"
import clasNames from "classnames"

import * as styles from "./page-layout.module.scss"

const OG_IMAGE = "/og-image.jpg"

const absoluteUrl = (siteUrl, path) => {
  const base = siteUrl.replace(/\/+$/, "")
  const clean = `/${path.replace(/^\/+/, "").replace(/\/+$/, "")}`
  // Gatsby serves pages at directory-style URLs, so keep the trailing slash on
  // everything but the root and real files (og-image.jpg …).
  const isFile = clean === "/" || clean.includes(".")
  return `${base}${isFile ? clean : `${clean}/`}`
}

export const PageLayout = ({ children, location, pageContext }) => {
  const {
    site: { siteMetadata },
  } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          siteUrl
        }
      }
    }
  `)
  const frontmatter = pageContext?.frontmatter ?? {}
  const BRAND = siteMetadata.title
  const DEFAULT_TITLE = `${BRAND} | Největší přešlapy bývalého prezidenta na časové ose`
  const TITLE = frontmatter.title
    ? `${frontmatter.title} | ${BRAND}`
    : DEFAULT_TITLE
  const DESC = frontmatter.description || siteMetadata.description

  // GitHub Pages serves 404.html for every unknown URL, so its rendered path is
  // not a real page — it must stay out of the index and out of the canonical.
  const path = location?.pathname ?? "/"
  const isNotFound = path.startsWith("/404")
  const canonical = absoluteUrl(siteMetadata.siteUrl, path)
  const image = absoluteUrl(siteMetadata.siteUrl, OG_IMAGE)

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: BRAND,
    alternateName: DEFAULT_TITLE,
    url: absoluteUrl(siteMetadata.siteUrl, "/"),
    description: siteMetadata.description,
    inLanguage: "cs",
  }

  return (
    <>
      <Helmet
        htmlAttributes={{ lang: "cs" }}
        title={TITLE}
        link={isNotFound ? [] : [{ rel: "canonical", href: canonical }]}
        meta={[
          {
            name: `description`,
            content: DESC,
          },
          ...(isNotFound
            ? [{ name: `robots`, content: `noindex, follow` }]
            : []),
          {
            property: `og:title`,
            content: TITLE,
          },
          {
            property: `og:description`,
            content: DESC,
          },
          {
            property: `og:type`,
            content: `website`,
          },
          {
            property: `og:url`,
            content: canonical,
          },
          {
            property: `og:site_name`,
            content: BRAND,
          },
          {
            property: `og:locale`,
            content: `cs_CZ`,
          },
          {
            property: `og:image`,
            content: image,
          },
          {
            property: `og:image:width`,
            content: `1200`,
          },
          {
            property: `og:image:height`,
            content: `630`,
          },
          {
            property: `og:image:alt`,
            content: DEFAULT_TITLE,
          },
          {
            name: `twitter:card`,
            content: `summary_large_image`,
          },
          {
            name: `twitter:title`,
            content: TITLE,
          },
          {
            name: `twitter:description`,
            content: DESC,
          },
          {
            name: `twitter:image`,
            content: image,
          },
        ]}
      >
        {!isNotFound && (
          <script type="application/ld+json">{JSON.stringify(schema)}</script>
        )}
      </Helmet>
      <div className={styles.page}>
        <header className={styles.header}>
          <p className={styles.brand}>
            <Link to="/">{DEFAULT_TITLE}</Link>
          </p>
        </header>
        <main className={clasNames(styles.main, "zeman")}>{children}</main>
        <footer className={styles.footer}>
          <small>
            podporujeme:{" "}
            <a href="https://www.nasdilejneztozakazou.cz/">
              Sdílejte, než to zakážou! pravá tvář Andreje Babiše
            </a>{" "}
            a <a href="https://www.volby-kscm.cz/">Komunisty nikdy víc</a>
          </small>
        </footer>
      </div>
    </>
  )
}

export default PageLayout
