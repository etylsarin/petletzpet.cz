const LONG_DATE = new Intl.DateTimeFormat("cs-CZ", {
  day: "numeric",
  month: "long",
  year: "numeric",
})

// "2026-09-30" → "30. září 2026". Noon UTC keeps the day stable in any
// timezone the build or the browser happens to run in.
export const formatDate = (isoDate: string) =>
  LONG_DATE.format(new Date(`${isoDate}T12:00:00Z`))

// Czech plural forms: 1 kauza, 2–4 kauzy, 5+ kauz.
export const plural = (
  count: number,
  one: string,
  few: string,
  many: string,
) => (count === 1 ? one : count >= 2 && count <= 4 ? few : many)

const MONTH = new Intl.DateTimeFormat("cs-CZ", { month: "long" })
const MONTH_YEAR = new Intl.DateTimeFormat("cs-CZ", {
  month: "long",
  year: "numeric",
})

// "2013-03-01" → "březen" (timeline month labels)
export const formatMonth = (isoDate: string) =>
  MONTH.format(new Date(`${isoDate}T12:00:00Z`))

// "2013-03-01" → "březen 2013"; event dates whose day is unknown are stored
// as the 1st of the month, so pages show only the month for those.
export const formatEventDate = (isoDate: string) =>
  isoDate.endsWith("-01")
    ? MONTH_YEAR.format(new Date(`${isoDate}T12:00:00Z`))
    : formatDate(isoDate)
