const prettyDate = (rawDate: string): string => {
  const thedate = new Date(rawDate)
  const formattedDate = Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(thedate)
  return formattedDate
}

const prettyHour = (rawDate: string): string => {
  const thedate = new Date(rawDate)
  const formattedDate = Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(thedate)
  return formattedDate
}

export { prettyDate, prettyHour }
