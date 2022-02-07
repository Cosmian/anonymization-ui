import localForage from "localforage"
import { link_config } from "../../../src/configs/paths"
import { Anonymization, Format } from "../../../src/redux/reducers/ciphercompute/anonymization/types"
import untreated from "../../fixtures/anonymization/untreated-anonymization.json"

const untreatedAnonymization: Anonymization = JSON.parse(JSON.stringify(untreated))

Cypress.on("uncaught:exception", () => {
  // returning false here prevents Cypress from
  // failing the test
  debugger
  return false
})

Cypress.on("fail", () => {
  debugger
})

const LS_ANONYMIZATIONS = "anonymizations"
const PBKDF2_SALT = "9ebc19fd-2bf9-44f1-82b0-65fc8e0db8d6"

describe("Anonymization", () => {
  beforeEach(async () => {
    // set data in indexedDB
    await localForage.setItem(LS_ANONYMIZATIONS, [untreatedAnonymization])
    // visit create page
  })

  it("Get anonymization", () => {
    cy.visit(`${link_config.anonymizations}/152c6e1e-9b4d-40cd-bc1e-ab107f9e0239/edit`)
    // verify elements
    cy.get("h2").contains(untreatedAnonymization.name).should("be.visible")
    untreatedAnonymization.input_dataset.dataset_schema.map((column) => cy.contains(column.name).should("be.visible"))
    untreatedAnonymization.input_dataset.dataset_schema.map((column) => cy.contains(column.format).should("be.visible"))
    untreatedAnonymization.input_dataset.dataset_schema.map((column) =>
      cy.contains(column.format !== Format.Date ? column.example : new Date(column.example).toUTCString()).should("be.visible")
    )
  })

  it("Set treatments on dataset", () => {
    cy.visit(`${link_config.anonymizations}/152c6e1e-9b4d-40cd-bc1e-ab107f9e0239/edit`)
    // 0 - Hash client Id
    cy.get(".editable-cell-value-wrap").eq(0).click()
    cy.get(".ant-form-item-control-input").click()
    cy.get("[data-cy=0]").contains("Hash").click()
    cy.get("#hash_treatment_salt").type("{selectall}").type(PBKDF2_SALT)
    cy.get("#after_output")
    cy.get("#after_output").should("have.value", "a163eb69d3ef8ba98f61b9fdb2852687f39b6870d72c7f9ef394ac91c219376b")
    // save
    cy.get("button").contains("Save").click()

    // 1 - Round orders
    cy.get(".editable-cell-value-wrap").eq(1).click()
    cy.get(".ant-form-item-control-input").click()
    cy.get("[data-cy=1]").contains("Aggregate").click()
    cy.get("#aggregate_treatment_precision").type("{selectall}").type("1")
    cy.get("#after_output").should("have.value", "10")
    // save
    cy.get("button").contains("Save").click()

    // 2 - Round date
    cy.get(".editable-cell-value-wrap").eq(2).click()
    cy.get(".ant-form-item-control-input").click()
    cy.get("[data-cy=2]").contains("Aggregate").click()
    cy.get(".ant-select-selection-item").contains("Minute").click()
    cy.contains("Month").click()
    cy.get("#after_output").should("have.value", "Mon, 01 Apr 1963 00:00:00 GMT")
    // save
    cy.get("button").contains("Save").click()

    // 3 - Add noise on date
    cy.get(".editable-cell-value-wrap").eq(3).click()
    cy.get(".ant-form-item-control-input").click()
    cy.get("[data-cy=3]").contains("AddNoise").click()
    cy.get(".ant-select-selection-item").contains("Year").click()
    cy.contains("Day").click()
    cy.get("#before_output")
      .invoke("val")
      .then((text) => {
        cy.get("#after_output").should("not.have.value", text)
      })
    // save
    cy.get("button").contains("Save").click()

    // 4 - Block text
    cy.get(".editable-cell-value-wrap").eq(4).click()
    cy.get(".ant-form-item-control-input").click()
    cy.get("[data-cy=4]").contains("BlockWords").click()
    cy.get("#blocknoise_treatment_word_list").type("phone").type("{enter}").type("laptop").type("{enter}")
    cy.get("#before_output")
      .invoke("val")
      .then((text) => {
        cy.get("#after_output").should("not.have.value", text)
      })
    // save
    cy.get("button").contains("Save").click()
  })

  // afterEach(async () => {
  //   // clear data in indexedDB
  //   await localForage.removeItem(LS_ANONYMIZATIONS)
  // })
})
