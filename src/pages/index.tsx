import * as React from "react"
import { graphql, Link } from "gatsby"

import { Seo, siteNodeIds, zemanPersonNode } from "../components/seo"
import { BookListItem } from "../components/book-card"
import { ResourceList } from "../components/resource-list"
import { TopicList } from "../components/topic-list"
import { BOOKS } from "../data/catalog"
import { useSiteMetadata } from "../hooks/use-site-metadata"
import { formatMonth, plural } from "../utils/format"
import * as styles from "../styles/home.module.scss"

type EventNode = {
  fields: { slug: string }
  frontmatter: {
    title: string
    navTitle: string
    description: string
    date: string
    updated: string
  }
}

type Month = { key: string; label: string; events: EventNode[] }
type Year = { year: string; months: Month[] }

// Newest year first (as the site always had it), months and events inside a
// year in calendar order.
const groupByYear = (events: EventNode[]): Year[] => {
  const years = new Map<string, Map<string, Month>>()
  events.forEach(node => {
    const date = node.frontmatter.date
    const year = date.slice(0, 4)
    const key = date.slice(0, 7)
    if (!years.has(year)) years.set(year, new Map())
    const months = years.get(year)
    if (!months.has(key)) {
      months.set(key, { key, label: formatMonth(date), events: [] })
    }
    months.get(key).events.push(node)
  })
  return [...years.entries()]
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([year, months]) => ({ year, months: [...months.values()] }))
}

const IndexPage = ({ data }) => {
  const events: EventNode[] = data.allMdx.nodes
  const years = groupByYear(events)

  return (
    <>
      <header className="hero">
        <div className="wrap">
          <h1 className="hero-title">
            Miloš Zeman: přešlapy v roli prezidenta
          </h1>
        </div>
      </header>

      <div className="wrap">
        <p className={styles.lead}>
          Čeho všeho jsme byli svědky za deset let úřadování Miloše Zemana na
          Hradě? Nabízíme přehled největších přešlapů na časové ose. Každý má
          vlastní stránku se souvislostmi, dohrou a odkazy na zdroje.
        </p>
        <p className={styles.stats}>
          <span>
            <strong>{events.length}</strong>{" "}
            {plural(events.length, "přešlap", "přešlapy", "přešlapů")}
          </span>
          <span>
            <strong>10</strong> let na Hradě (2013–2023)
          </span>
          <span>
            <strong>{BOOKS.length}</strong>{" "}
            {plural(BOOKS.length, "kniha", "knihy", "knih")} k tématu
          </span>
        </p>
        <div className={styles.topics}>
          <strong>Témata:</strong> <TopicList />
        </div>
        <nav aria-label="Roky" className={styles.years}>
          {years.map(({ year }) => (
            <a key={year} href={`#rok-${year}`}>
              {year}
            </a>
          ))}
        </nav>

        {years.map(({ year, months }) => (
          <section key={year} id={`rok-${year}`} className={styles.section}>
            <h2>{year}</h2>
            <ul>
              {months.map(month => (
                <li key={month.key}>
                  <p>{month.label}</p>
                  <ul>
                    {month.events.map(node => (
                      <li key={node.fields.slug}>
                        <h3>
                          <Link to={node.fields.slug}>
                            {node.frontmatter.navTitle}
                          </Link>
                        </h3>
                        <p>{node.frontmatter.description}</p>
                        <Link
                          to={node.fields.slug}
                          className={styles.more}
                          aria-hidden="true"
                          tabIndex={-1}
                        >
                          Celý přešlap se zdroji →
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <section className={styles.block} aria-labelledby="knihy">
          <h2 id="knihy" className="section-title">
            Chcete vědět víc? Přečtěte si knihy
          </h2>
          <ul className={styles.books}>
            {BOOKS.map(book => (
              <BookListItem key={book.id} book={book} />
            ))}
          </ul>
          <p>
            <Link to="/knihy/" className="button">
              Knihy o Miloši Zemanovi
            </Link>
          </p>
        </section>

        <section className={styles.block} aria-labelledby="overujte">
          <h2 id="overujte" className="section-title">
            Myslete kriticky. Ověřujte si všechno
          </h2>
          <p>
            Než něco nasdílíte, ověřte si to. Pomůžou vám tyhle důvěryhodné
            zdroje:
          </p>
          <ResourceList />
          <p>
            A to platí i pro tenhle web: klikejte na odkazy a čtěte původní
            zdroje. <Link to="/o-webu/">Jak web vzniká</Link>.
          </p>
        </section>
      </div>
    </>
  )
}

export default IndexPage

export const Head = ({ data, location }) => {
  const site = useSiteMetadata()
  const ids = siteNodeIds(site.siteUrl)
  const events: EventNode[] = data.allMdx.nodes

  return (
    <Seo
      pathname={location.pathname}
      schema={[
        {
          "@type": "CollectionPage",
          "@id": `${site.siteUrl}/#webpage`,
          url: `${site.siteUrl}/`,
          name: "Přešlapy Miloše Zemana v roli prezidenta",
          inLanguage: "cs-CZ",
          isPartOf: { "@id": ids.website },
          about: { "@id": ids.zeman },
          dateModified: events
            .map(node => node.frontmatter.updated)
            .sort()
            .at(-1),
          mainEntity: {
            "@type": "ItemList",
            name: "Přešlapy Miloše Zemana chronologicky",
            itemListOrder: "https://schema.org/ItemListOrderAscending",
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
      ]}
    />
  )
}

export const query = graphql`
  query HomePage {
    allMdx(
      filter: { fields: { slug: { ne: null } } }
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
          updated(formatString: "YYYY-MM-DD")
        }
      }
    }
  }
`
