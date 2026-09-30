// Topic tags used in event frontmatter (`tags`). Each used tag gets an
// overview page at /tema/<id>/ and drives the "Související přešlapy" links.
export type Tag = {
  id: string
  label: string
  title: string
}

export const TAGS: Tag[] = [
  {
    id: "ustava",
    label: "Ústava a pravomoci",
    title: "Miloš Zeman a ústava: spory o pravomoci prezidenta",
  },
  {
    id: "vlady",
    label: "Vlády a ministři",
    title: "Miloš Zeman a jmenování vlád a ministrů",
  },
  { id: "milosti", label: "Milosti", title: "Milosti Miloše Zemana" },
  {
    id: "hrad",
    label: "Lidé kolem Hradu",
    title: "Lidé kolem Miloše Zemana: Mynář, Nejedlý a další",
  },
  { id: "rusko", label: "Rusko", title: "Miloš Zeman a Rusko" },
  { id: "cina", label: "Čína", title: "Miloš Zeman a Čína" },
  {
    id: "zahranici",
    label: "Zahraniční politika",
    title: "Miloš Zeman a zahraniční politika",
  },
  {
    id: "vyroky",
    label: "Výroky a vulgarity",
    title: "Výroky a vulgarity Miloše Zemana",
  },
  { id: "media", label: "Novináři a média", title: "Miloš Zeman a novináři" },
  { id: "babis", label: "Zeman a Babiš", title: "Miloš Zeman a Andrej Babiš" },
  {
    id: "vyznamenani",
    label: "Vyznamenání",
    title: "Státní vyznamenání od Miloše Zemana",
  },
  {
    id: "zdravi",
    label: "Zdravotní stav",
    title: "Zdravotní stav Miloše Zemana",
  },
  { id: "historie", label: "Historie", title: "Miloš Zeman a výklad historie" },
]

export const tagById = (id: string) => TAGS.find(tag => tag.id === id)
