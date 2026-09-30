import * as React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"
import { TAGS } from "../data/tags"

// Chips linking to /tema/<id>/ for every tag that at least one event uses.
export const TopicList = ({ exclude }: { exclude?: string }) => {
  const { allMdx } = useStaticQuery(graphql`
    query UsedTags {
      allMdx(filter: { fields: { slug: { ne: null } } }) {
        distinct(field: { frontmatter: { tags: SELECT } })
      }
    }
  `)
  const used = new Set<string>(allMdx.distinct)

  return (
    <p>
      {TAGS.filter(tag => used.has(tag.id) && tag.id !== exclude).map(tag => (
        <Link key={tag.id} to={`/tema/${tag.id}/`} className="tag">
          {tag.label}
        </Link>
      ))}
    </p>
  )
}

export default TopicList
