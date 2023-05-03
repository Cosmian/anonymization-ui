import { link_config } from "../../../src/configs/paths"

export {}

Cypress.on("uncaught:exception", () => {
  // returning false here prevents Cypress from
  // failing the test
  debugger
  return false
})

Cypress.on("fail", () => {
  debugger
})

const ANONYMIZATION_NAME = "Testing anonymization"

describe("Create new anonymization", () => {
  it("It should filled the name and description and display a green icon", () => {
    // visit create page
    cy.visit(link_config.newAnonymization)
    // status
    cy.get(":nth-child(1) > .ant-collapse-header > .ant-collapse-extra > .anticon").should("have.css", "color", "rgba(0, 0, 0, 0.85)")
    cy.get("button").eq(1).should("be.disabled")
    // Fill part 1
    cy.get("#create_anonymize_dataset_name").type(ANONYMIZATION_NAME)
    cy.get("#create_anonymize_dataset_description").type("Only for testing")
    // status
    cy.get(":nth-child(1) > .ant-collapse-header > .ant-collapse-extra > .anticon").should("have.css", "color", "rgb(0, 128, 0)")
  })
})
