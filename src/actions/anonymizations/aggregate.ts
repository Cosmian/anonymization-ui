import { round } from "lodash"
import { PrecisionType } from "../../redux/reducers/ciphercompute/anonymization/types"

// AGGREGATE
// Round Integer and Float
export const roundNumber = (input: number, precision: number): number => {
  const rounded = round(input, -precision)
  return rounded
}

// Round Date
export const roundDate = (input: string, precision: PrecisionType): Date => {
  const myDate = new Date(input)
  let p = 0
  const month = new Date(myDate).getUTCMonth()
  const year = new Date(myDate).getUTCFullYear()
  let date = new Date(year, month, 1, 1, 0, 0)

  switch (precision) {
    case PrecisionType.Minute:
      p = 60 * 1000 // milliseconds in a minute
      return new Date(Math.round(myDate.getTime() / p) * p)
    case PrecisionType.Hour:
      p = 60 * 60 * 1000 // milliseconds in an hour
      return new Date(Math.round(myDate.getTime() / p) * p)
    case PrecisionType.Day:
      p = 24 * 60 * 60 * 1000 // milliseconds in an day
      return new Date(Math.round(myDate.getTime() / p) * p)
    case PrecisionType.Month:
      date = new Date(year, month, 1, 1, 0, 0)
      return date
    case PrecisionType.Year:
      date = new Date(year, 0, 1, 1, 0, 0)
      return date
    default:
      return myDate
  }
}
