import * as React from "react"
import { graphql, Link } from "gatsby"
import { MDXProvider } from "@mdx-js/react"

import { Seo, siteNodeIds, zemanPersonNode } from "../components/seo"
import { mdxComponents } from "../components/mdx-components"
import { BookListItem } from "../components/book-card"
import { bookById } from "../data/catalog"
import { tagById } from "../data/tags"
import { useSiteMetadata } from "../hooks/use-site-metadata"
import { formatDate, formatEventDate } from "../utils/format"
import * as styles from "./preslap.module.scss"

const EventTemplate = ({ data, pageContext, children }) => {
  const { frontmatter } = data.mdx
  const books = (frontmatter.books ?? []).map(bookById).filter(Boolean)
  const tags = (frontmatter.tags ?? []).map(tagById).filter(Boolean)
  const year = frontmatter.date.slice(0, 4)
  const { prev, next, related = [] } = pageContext

  return (
    <article>
      <header className="hero">
        <div className="wrap">
          <nav aria-label="Drobečková navigace" className="kicker">
            <Link to="/">Přešlapy Miloše Zemana</Link>
            <span aria-hidden="true"> › </span>
            <Link to={`/#rok-${year}`}>{year}</Link>
          </nav>
          <h1 className="hero-title">{frontmatter.title}</h1>
          <p className={styles.meta}>
            <time dateTime={frontmatter.date}>
              {formatEventDate(frontmatter.date)}
            </time>
            {tags.map(tag => (
              <Link key={tag.id} to={`/tema/${tag.id}/`} className={styles.tag}>
                {tag.label}
              </Link>
            ))}
          </p>
        </div>
      </header>

      <div className="wrap">
        <div className="prose">
          <MDXProvider components={mdxComponents}>{children}</MDXProvider>
        </div>

        <p className={styles.updated}>
          Aktualizováno{" "}
          <time dateTime={frontmatter.updated}>
            {formatDate(frontmatter.updated)}
          </time>
        </p>

        {books.length > 0 && (
          <section className={styles.box} aria-labelledby="knihy-k-tematu">
            <h2 id="knihy-k-tematu">Knihy k tématu</h2>
            <ul className={styles.books}>
              {books.map(book => (
                <BookListItem key={book.id} book={book} />
              ))}
            </ul>
            <p className={styles.disclosure}>
              <Link to="/o-webu/#partnerske-odkazy">Partnerské odkazy</Link>:
              při nákupu dostaneme provizi, cena se vám nemění.{" "}
              <Link to="/knihy/">Všechny knihy o Zemanovi</Link>
            </p>
          </section>
        )}

        {related.length > 0 && (
          <section className={styles.box} aria-labelledby="souvisejici">
            <h2 id="souvisejici">Související přešlapy</h2>
            <ul className={styles.related}>
              {related.map(item => (
                <li key={item.slug}>
                  <Link to={item.slug}>{item.navTitle}</Link>
                  <span>{formatEventDate(item.date)}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        <nav className={styles.prevNext} aria-label="Další přešlapy v čase">
          {prev ? (
            <Link to={prev.slug} rel="prev">
              <span className={styles.dir}>← Předchozí přešlap</span>
              <strong>{prev.navTitle}</strong>
              <span className={styles.dir}>{formatEventDate(prev.date)}</span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link to={next.slug} rel="next" className={styles.next}>
              <span className={styles.dir}>Další přešlap →</span>
              <strong>{next.navTitle}</strong>
              <span className={styles.dir}>{formatEventDate(next.date)}</span>
            </Link>
          ) : (
            <Link to="/" className={styles.next}>
              <span className={styles.dir}>Časová osa →</span>
              <strong>Všechny přešlapy</strong>
            </Link>
          )}
        </nav>
      </div>
    </article>
  )
}

export default EventTemplate

export const Head = ({ data, location }) => {
  const { frontmatter, fields } = data.mdx
  const site = useSiteMetadata()
  const ids = siteNodeIds(site.siteUrl)
  const url = `${site.siteUrl}${fields.slug}`

  const schema = [
    {
      "@type": "Article",
      "@id": `${url}#article`,
      headline: frontmatter.title,
      description: frontmatter.description,
      image: `${site.siteUrl}/og-image.jpg`,
      datePublished: frontmatter.published ?? frontmatter.updated,
      dateModified: frontmatter.updated,
      inLanguage: "cs-CZ",
      mainEntityOfPage: url,
      isPartOf: { "@id": ids.website },
      author: { "@id": ids.organization },
      publisher: { "@id": ids.organization },
      about: { "@id": ids.zeman },
      keywords: (frontmatter.tags ?? [])
        .map(id => tagById(id)?.label)
        .filter(Boolean)
        .join(", "),
    },
    zemanPersonNode(site.siteUrl),
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Přešlapy Miloše Zemana",
          item: `${site.siteUrl}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: frontmatter.navTitle,
          item: url,
        },
      ],
    },
  ]

  return (
    <Seo
      title={frontmatter.title}
      description={frontmatter.description}
      pathname={location.pathname}
      type="article"
      schema={schema}
    >
      <meta property="article:modified_time" content={frontmatter.updated} />
    </Seo>
  )
}

export const query = graphql`
  query EventById($id: String!) {
    mdx(id: { eq: $id }) {
      fields {
        slug
      }
      frontmatter {
        title
        navTitle
        description
        tags
        books
        date(formatString: "YYYY-MM-DD")
        published(formatString: "YYYY-MM-DD")
        updated(formatString: "YYYY-MM-DD")
      }
    }
  }
`
