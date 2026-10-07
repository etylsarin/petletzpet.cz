const fs = require("fs")
const path = require("path")

const EVENT_TEMPLATE = path.resolve("./src/templates/preslap.tsx")
const TAG_TEMPLATE = path.resolve("./src/templates/tema.tsx")
const RELATED_LIMIT = 4

// Explicit types so a missing optional field in one event file doesn't
// change the inferred schema for all of them.
exports.createSchemaCustomization = ({ actions }) => {
  actions.createTypes(`
    type Mdx implements Node {
      frontmatter: MdxFrontmatter
      fields: MdxFields
    }
    type MdxFields {
      slug: String
    }
    type MdxFrontmatter {
      title: String
      navTitle: String
      description: String
      date: Date @dateformat
      tags: [String]
      books: [String]
      related: [String]
      published: Date @dateformat
      updated: Date @dateformat
    }
  `)
}

// Only event files get a slug; that is also how queries tell them apart from
// other MDX in the project.
exports.onCreateNode = ({ node, actions, getNode }) => {
  if (node.internal.type !== "Mdx") return
  const file = getNode(node.parent)
  if (file?.sourceInstanceName !== "preslapy") return
  actions.createNodeField({
    node,
    name: "slug",
    value: `/preslapy/${file.name}/`,
  })
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const result = await graphql(`
    {
      allMdx(
        filter: { fields: { slug: { ne: null } } }
        sort: { frontmatter: { date: ASC } }
      ) {
        nodes {
          id
          fields {
            slug
          }
          frontmatter {
            navTitle
            date(formatString: "YYYY-MM-DD")
            tags
            related
            updated(formatString: "YYYY-MM-DD")
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild("Nepodařilo se načíst přešlapy", result.errors)
    return
  }

  const events = result.data.allMdx.nodes
  const link = node =>
    node
      ? {
          slug: node.fields.slug,
          navTitle: node.frontmatter.navTitle,
          date: node.frontmatter.date,
        }
      : null
  const bySlug = new Map(events.map(node => [node.fields.slug, node]))

  // Hand-picked links first, then events sharing the most tags, closest in
  // time first.
  const related = node => {
    const picked = (node.frontmatter.related ?? []).map(name => {
      const target = bySlug.get(`/preslapy/${name}/`)
      if (!target) {
        reporter.panicOnBuild(
          `${node.fields.slug}: neznámý související přešlap "${name}"`,
        )
      }
      return target
    })
    const tags = new Set(node.frontmatter.tags ?? [])
    const time = Date.parse(node.frontmatter.date)
    const byTags = events
      .filter(other => other !== node && !picked.includes(other))
      .map(other => ({
        other,
        shared: (other.frontmatter.tags ?? []).filter(tag => tags.has(tag))
          .length,
        distance: Math.abs(Date.parse(other.frontmatter.date) - time),
      }))
      .filter(item => item.shared > 0)
      .sort((a, b) => b.shared - a.shared || a.distance - b.distance)
      .map(item => item.other)
    return [...picked.filter(Boolean), ...byTags]
      .slice(0, RELATED_LIMIT)
      .map(link)
  }

  events.forEach((node, index) => {
    actions.createPage({
      path: node.fields.slug,
      component: `${EVENT_TEMPLATE}?__contentFilePath=${node.internal.contentFilePath}`,
      context: {
        id: node.id,
        prev: link(events[index - 1]),
        next: link(events[index + 1]),
        related: related(node),
        // Read by gatsby-plugin-sitemap for <lastmod>.
        updated: node.frontmatter.updated,
      },
    })
  })

  // One overview page per topic tag (only tags that are actually used).
  const usedTags = new Set(events.flatMap(node => node.frontmatter.tags ?? []))
  const latest = tag =>
    events
      .filter(node => (node.frontmatter.tags ?? []).includes(tag))
      .map(node => node.frontmatter.updated)
      .sort()
      .at(-1)
  usedTags.forEach(tag => {
    actions.createPage({
      path: `/tema/${tag}/`,
      component: TAG_TEMPLATE,
      context: { tag, updated: latest(tag) },
    })
  })
}

/**
 * React's SSR stream occasionally emits a stray NUL byte at a chunk boundary
 * that lands inside a multi-byte UTF-8 character. It corrupts the rendered
 * text (e.g. "místopředseda" -> "místop\0ředseda") and makes the file serve as
 * binary data rather than HTML. Strip those bytes from the generated pages.
 */
exports.onPostBuild = ({ reporter }) => {
  const publicDir = path.join(__dirname, "public")
  const cleaned = []

  const walk = dir => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        walk(full)
      } else if (entry.name.endsWith(".html")) {
        const buf = fs.readFileSync(full)
        if (buf.includes(0)) {
          fs.writeFileSync(full, Buffer.from(buf.filter(byte => byte !== 0)))
          cleaned.push(path.relative(publicDir, full))
        }
      }
    }
  }

  walk(publicDir)

  if (cleaned.length) {
    reporter.warn(
      `Stripped stray NUL bytes from ${cleaned.length} HTML file(s): ${cleaned.join(", ")}`
    )
  }
}
