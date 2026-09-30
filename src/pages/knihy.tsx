import * as React from "react"
import { graphql, Link } from "gatsby"

import { Seo, siteNodeIds, zemanPersonNode } from "../components/seo"
import { BookCard } from "../components/book-card"
import { BOOKS } from "../data/catalog"
import { useSiteMetadata } from "../hooks/use-site-metadata"
import * as styles from "../styles/page.module.scss"

const TITLE = "Knihy o Miloši Zemanovi"
const DESCRIPTION =
  "Knihy novinářů o prezidentovi Miloši Zemanovi: Rudý Zeman Jaroslava Kmenty a Zemanovo finále Zdislavy Pokorné. Co v nich najdete a ke kterým přešlapům se vztahují."

type EventLink = { slug: string; navTitle: string; books: string[] }

const BooksPage = ({ data }) => {
  const events: EventLink[] = data.allMdx.nodes.map(node => ({
    slug: node.fields.slug,
    navTitle: node.frontmatter.navTitle,
    books: node.frontmatter.books ?? [],
  }))

  return (
    <>
      <header className="hero">
        <div className="wrap">
          <p className="kicker">Doporučená literatura</p>
          <h1 className="hero-title">{TITLE}</h1>
        </div>
      </header>
      <div className="wrap">
        <p className={styles.lead}>
          O deseti letech Miloše Zemana na Hradě a o lidech kolem něj vyšly
          knihy investigativních novinářů. U každé najdete i{" "}
          <Link to="/">přešlapy</Link>, ke kterým se vztahuje.
        </p>
        <p className={styles.note}>
          Odkazy vedou do knihkupectví Knihy Dobrovský a jsou{" "}
          <Link to="/o-webu/#partnerske-odkazy">partnerské</Link>: když přes ně
          knihu koupíte, dostaneme malou provizi, ze které platíme provoz webu.
          Cena se pro vás nemění.
        </p>

        {BOOKS.map(book => (
          <BookCard
            key={book.id}
            book={book}
            cases={events.filter(event => event.books.includes(book.id))}
          />
        ))}
      </div>
    </>
  )
}

export default BooksPage

export const Head = ({ location }) => {
  const site = useSiteMetadata()
  const ids = siteNodeIds(site.siteUrl)
  const url = `${site.siteUrl}/knihy/`

  return (
    <Seo
      title={TITLE}
      description={DESCRIPTION}
      pathname={location.pathname}
      schema={[
        {
          "@type": "CollectionPage",
          "@id": `${url}#webpage`,
          url,
          name: TITLE,
          description: DESCRIPTION,
          inLanguage: "cs-CZ",
          isPartOf: { "@id": ids.website },
          about: { "@id": ids.zeman },
          mainEntity: {
            "@type": "ItemList",
            name: TITLE,
            numberOfItems: BOOKS.length,
            itemListElement: BOOKS.map((book, index) => ({
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type": "Book",
                "@id": `${url}#${book.id}`,
                name: book.title,
                url: book.url,
                inLanguage: "cs",
                about: { "@id": ids.zeman },
                author: book.authors.map(name => ({ "@type": "Person", name })),
                ...(book.year ? { datePublished: String(book.year) } : {}),
                ...(book.publisher
                  ? {
                      publisher: {
                        "@type": "Organization",
                        name: book.publisher,
                      },
                    }
                  : {}),
                ...(book.isbn ? { isbn: book.isbn } : {}),
                ...(book.pages ? { numberOfPages: book.pages } : {}),
              },
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
            { "@type": "ListItem", position: 2, name: TITLE, item: url },
          ],
        },
      ]}
    />
  )
}

export const query = graphql`
  query BooksPage {
    allMdx(
      filter: { fields: { slug: { ne: null } } }
      sort: { frontmatter: { date: ASC } }
    ) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          navTitle
          books
        }
      }
    }
  }
`
