import * as React from "react"
import { useSiteMetadata } from "../hooks/use-site-metadata"

type SeoProps = {
  /** Page title without the site name; omitted on the homepage. */
  title?: string
  description?: string
  pathname: string
  type?: "website" | "article"
  noindex?: boolean
  /** Extra schema.org nodes, merged into one JSON-LD @graph. */
  schema?: object[]
  children?: React.ReactNode
}

export const HOME_TITLE =
  "Přešlapy Miloše Zemana v roli prezidenta na časové ose"

// The share image is the same wide header photo on every page.
const OG_IMAGE = { path: "/og-image.jpg", width: 1200, height: 630 }

// Gatsby emits every page as a directory, so canonical URLs end with a slash.
// A path that ends in a file extension (/404.html) must not.
const withTrailingSlash = (pathname: string) =>
  pathname.endsWith("/") || /\.[a-z0-9]+$/i.test(pathname)
    ? pathname
    : `${pathname}/`

export const siteNodeIds = (siteUrl: string) => ({
  website: `${siteUrl}/#website`,
  organization: `${siteUrl}/#organization`,
  zeman: `${siteUrl}/#milos-zeman`,
})

// The subject of every page, referenced from Article/CollectionPage nodes.
export const zemanPersonNode = (siteUrl: string) => ({
  "@type": "Person",
  "@id": siteNodeIds(siteUrl).zeman,
  name: "Miloš Zeman",
  jobTitle: "prezident České republiky v letech 2013–2023",
  sameAs: ["https://cs.wikipedia.org/wiki/Milo%C5%A1_Zeman"],
})

export const Seo = ({
  title,
  description,
  pathname,
  type = "website",
  noindex = false,
  schema = [],
  children,
}: SeoProps) => {
  const site = useSiteMetadata()
  const ids = siteNodeIds(site.siteUrl)

  const fullTitle = title
    ? `${title} | ${site.title}`
    : `${site.title} | ${HOME_TITLE}`
  const desc = description || site.description
  const canonical = `${site.siteUrl}${withTrailingSlash(pathname)}`
  const imageUrl = `${site.siteUrl}${OG_IMAGE.path}`

  const graph = [
    {
      "@type": "WebSite",
      "@id": ids.website,
      name: site.title,
      alternateName: HOME_TITLE,
      url: `${site.siteUrl}/`,
      description: site.description,
      inLanguage: "cs-CZ",
      publisher: { "@id": ids.organization },
    },
    {
      "@type": "Organization",
      "@id": ids.organization,
      name: site.title,
      url: `${site.siteUrl}/`,
      logo: `${site.siteUrl}/icons/icon-512x512.png`,
    },
    ...schema,
  ]

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      {/* Google ignores rel=canonical on a noindex page and warns about the
          combination, so the two are kept mutually exclusive. */}
      {noindex ? (
        <meta name="robots" content="noindex, follow" />
      ) : (
        <>
          <link rel="canonical" href={canonical} />
          <meta
            name="robots"
            content="index, follow, max-image-preview:large, max-snippet:-1"
          />
        </>
      )}
      <meta property="og:site_name" content={site.title} />
      <meta property="og:locale" content="cs_CZ" />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title || HOME_TITLE} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content={String(OG_IMAGE.width)} />
      <meta property="og:image:height" content={String(OG_IMAGE.height)} />
      <meta property="og:image:alt" content="Miloš Zeman s mikrofonem" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title || HOME_TITLE} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={imageUrl} />
      {!noindex && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": graph,
          })}
        </script>
      )}
      {children}
    </>
  )
}

export default Seo
