import { faker } from "@faker-js/faker";

describe("Modals", () => {
  beforeEach(() => {
    cy.seedDataBase();
  });

  it("create board form submition", () => {
    cy.visit("/");
    cy.request("/api/boards").as("boards");
    cy.openModal("my_modal_7");

    cy.intercept("POST", "/api/boards").as("createBoard");

    cy.get(".7 input").each(($input) => {
      cy.wrap($input).type(faker.word.conjunction());
    });

    cy.get('.7 button[type="submit"]').click();

    cy.get("@boards")
      .its("body")
      .then((item) => {
        cy.get(".board-content").should("have.length", item.length * 2);
      });

    cy.checkResponseStatus(308, "@createBoard");

    cy.get(".board-content").should("have.length", 2);
  });

  context("Need Data", () => {
    beforeEach(() => {
      cy.randomColumn();
      cy.visit("/");
    });

    it("delete board form submition", () => {
      cy.openModal("deleteAll");

      cy.intercept("DELETE", "/api/boards/*").as("deleteBoard");

      cy.get(".board-content").eq(1).forceClick();

      cy.get(".delete-board").eq(0).forceClick();

      cy.checkResponseStatus(200, "@deleteBoard");

      cy.get(".board-content").should("have.length", 0);
    });

    it("edit board submition", () => {
      cy.openModal("my_modal_6");

      cy.intercept("PATCH", "/api/boards/*").as("updateBoard");

      cy.get('.6 input[name="title"]').as("title").should("not.have.value", "");

      cy.get('.6 input[name*="columns"]').each(($input) => {
        cy.wrap($input).clear();
        cy.wrap($input).type(faker.word.conjunction());
      });

      cy.get("@title").clear().type(faker.word.adverb());

      cy.get('.6 button[type="submit"]').click();

      cy.checkResponseStatus(200, "@updateBoard");
    });
  });
});
