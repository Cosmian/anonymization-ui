import { roundNumber } from "../../../src/actions/anonymizations/aggregate"

describe("Unit test treatment functions", () => {})

describe("actions", () => {
  context("roundNumber", () => {
    it("round a number", () => {
      const notRoundNumber = 258.123
      const precision = 1
      const result = roundNumber(notRoundNumber, precision)
      expect(result).to.be.eq(260)
      expect(result).not.to.be.eq(notRoundNumber)
    })
  })
})
