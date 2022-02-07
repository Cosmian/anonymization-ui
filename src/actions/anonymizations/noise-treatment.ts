import { NoiseType, PrecisionType } from "../../redux/reducers/ciphercompute/anonymization/types"

// GAUSSIAN
export const gaussian = (mean: number, stdev: number): number => {
  let y1: number
  const result = (): number => {
    let x1, x2, w
    do {
      x1 = 2.0 * Math.random() - 1.0
      x2 = 2.0 * Math.random() - 1.0
      w = x1 * x1 + x2 * x2
    } while (w >= 1.0)
    w = Math.sqrt((-2.0 * Math.log(w)) / w)
    y1 = x1 * w

    const retval = mean + stdev * y1
    if (retval > 0) return retval
    return -retval
  }
  return result()
}

// LAPLACE
const sgn = (x: number): number => {
  return x < 0 ? -1 : 1
}

// From wikipedia:
// Lap(X) = mu - b sgn(U) ln (1-2|U|) where U is a random variable between -0.5 and 0.5
export const laplace = (mu: number, b: number): number => {
  const U = Math.random() - 0.5
  return mu - b * sgn(U) * Math.log(1 - 2 * Math.abs(U))
}

export const privatize = (f: number, deltaF: number, epsilon: number): number => {
  return f + laplace(0.0, deltaF / epsilon)
}

export const addNoiseToDate = (utcDate: Date, noiseType: NoiseType, type: PrecisionType, deviation: number): Date => {
  let year = utcDate.getUTCFullYear()
  let month = utcDate.getUTCMonth()
  let day = utcDate.getUTCDate()
  let hours = utcDate.getUTCHours()
  let minutes = utcDate.getUTCMinutes()
  let seconds = utcDate.getUTCSeconds()

  const roundSeconds = (seconds: number): number => {
    return noiseType === NoiseType.Laplace ? laplace(seconds, deviation) : gaussian(seconds, deviation)
  }
  const roundMinutes = (minutes: number): number => {
    return noiseType === NoiseType.Laplace ? laplace(minutes, deviation) : gaussian(minutes, deviation)
  }
  const roundHours = (hours: number): number => {
    return noiseType === NoiseType.Laplace ? laplace(hours, deviation) : gaussian(hours, deviation)
  }
  const roundDay = (day: number): number => {
    return noiseType === NoiseType.Laplace ? laplace(day, deviation) : gaussian(day, deviation)
  }
  const roundMonth = (month: number): number => {
    return noiseType === NoiseType.Laplace ? laplace(month, deviation) : gaussian(month, deviation)
  }
  const roundYear = (year: number): number => {
    return noiseType === NoiseType.Laplace ? laplace(year, deviation) : gaussian(year, deviation)
  }

  switch (type) {
    case PrecisionType.Second:
      seconds = roundSeconds(seconds)
      break
    case PrecisionType.Minute:
      minutes = roundMinutes(minutes)
      seconds = roundSeconds(seconds)
      break
    case PrecisionType.Hour:
      hours = roundHours(hours)
      minutes = roundMinutes(minutes)
      seconds = roundSeconds(seconds)
      break
    case PrecisionType.Day:
      day = roundDay(day)
      hours = roundHours(hours)
      minutes = roundMinutes(minutes)
      seconds = roundSeconds(seconds)
      break
    case PrecisionType.Month:
      month = roundMonth(month)
      day = roundDay(day)
      hours = roundHours(hours)
      minutes = roundMinutes(minutes)
      seconds = roundSeconds(seconds)
      break
    case PrecisionType.Year:
      year = roundYear(year)
      month = roundMonth(month)
      day = roundDay(day)
      hours = roundHours(hours)
      minutes = roundMinutes(minutes)
      seconds = roundSeconds(seconds)
      break
  }

  return new Date(year, month, day, hours, minutes, seconds)
}
