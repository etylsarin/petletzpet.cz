import * as React from "react"
import { graphql, Link } from "gatsby"

import { Seo, siteNodeIds, zemanPersonNode } from "../components/seo"
import { TopicList } from "../components/topic-list"
import { tagById } from "../data/tags"
import { useSiteMetadata } from "../hooks/use-site-metadata"
import { formatEventDate, plural } from "../utils/format"
import * as styles from "./tema.module.scss"

type EventNode = {
  fields: { slug: string }
  frontmatter: {
    title: string
    navTitle: string
    description: string
    date: string
  }
}

const TopicTemplate = ({ data, pageContext }) => {
  const tag = tagById(pageContext.tag)
  const events: EventNode[] = data.allMdx.nodes

  return (
    <>
      <header className="hero">
        <div className="wrap">
          <nav aria-label="Drobečková navigace" className="kicker">
            <Link to="/">Přešlapy Miloše Zemana</Link>
            <span aria-hidden="true"> › </span>
            Téma
          </nav>
          <h1 className="hero-title">{tag?.title}</h1>
        </div>
      </header>

      <div className="wrap">
        <p className={styles.lead}>
          {events.length}{" "}
          {plural(events.length, "přešlap", "přešlapy", "přešlapů")} na téma „
          {tag?.label}“ v časovém pořadí. Každý má vlastní stránku se
          souvislostmi a odkazy na zdroje.
        </p>

        <ol className={styles.list}>
          {events.map(node => (
            <li key={node.fields.slug}>
              <time dateTime={node.frontmatter.date}>
                {formatEventDate(node.frontmatter.date)}
              </time>
              <h2>
                <Link to={node.fields.slug}>{node.frontmatter.navTitle}</Link>
              </h2>
              <p>{node.frontmatter.description}</p>
            </li>
          ))}
        </ol>

        <section className={styles.other} aria-labelledby="dalsi-temata">
          <h2 id="dalsi-temata">Další témata</h2>
          <TopicList exclude={pageContext.tag} />
        </section>
      </div>
    </>
  )
}

export default TopicTemplate

export const Head = ({ data, location, pageContext }) => {
  const site = useSiteMetadata()
  const ids = siteNodeIds(site.siteUrl)
  const tag = tagById(pageContext.tag)
  const events: EventNode[] = data.allMdx.nodes
  const url = `${site.siteUrl}${location.pathname}`
  const description = `${tag?.title}: ${events
    .slice(0, 3)
    .map(node => node.frontmatter.navTitle)
    .join(", ")} a další přešlapy chronologicky, u každého odkazy na zdroje.`

  return (
    <Seo
      title={tag?.title}
      description={description}
      pathname={location.pathname}
      schema={[
        {
          "@type": "CollectionPage",
          "@id": `${url}#webpage`,
          url,
          name: tag?.title,
          inLanguage: "cs-CZ",
          isPartOf: { "@id": ids.website },
          about: { "@id": ids.zeman },
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: events.length,
            itemListElement: events.map((node, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: node.frontmatter.title,
              url: `${site.siteUrl}${node.fields.slug}`,
            })),
          },
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
            { "@type": "ListItem", position: 2, name: tag?.title, item: url },
          ],
        },
      ]}
    />
  )
}

export const query = graphql`
  query TopicEvents($tag: String!) {
    allMdx(
      filter: {
        fields: { slug: { ne: null } }
        frontmatter: { tags: { in: [$tag] } }
      }
      sort: { frontmatter: { date: ASC } }
    ) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          title
          navTitle
          description
          date(formatString: "YYYY-MM-DD")
        }
      }
    }
  }
`
