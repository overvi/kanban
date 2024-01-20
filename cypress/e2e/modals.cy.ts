import { faker } from "@faker-js/faker";

describe("Modals", () => {
  beforeEach(() => {
    cy.seedDataBase();
    cy.randomBoard();
    cy.randomColumn();
    cy.randomTask();
  });
  it("opening and closing", () => {
    cy.openAndCloseModal("my_modal_7");
    cy.openAndCloseModal("my_modal_6");
    cy.openAndCloseModal("deleteAll");
  });

  context("Form Submition", () => {
    beforeEach(() => {
      cy.request("/api/boards").as("boards");
    });

    it("create modal form submition", () => {
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

      cy.wait("@createBoard").then((interception) => {
        expect(interception.response.statusCode).to.equal(308);
      });

      cy.get(".board-content").should("have.length", 2);
    });

    it.only("delete modal form submition", () => {
      cy.openModal("deleteAll");

      cy.intercept("DELETE", "/api/boards/*").as("deleteBoard");

      cy.get(".board-content").eq(1).click({ force: true });

      cy.get(".delete-board").eq(0).click({ force: true });

      cy.wait("@deleteBoard").then((interception) => {
        expect(interception.response.statusCode).to.equal(200);
      });

      cy.get(".board-content").should("have.length", 0);
    });

    it("Edit Board Submition", () => {
      cy.openModal("my_modal_6");

      cy.intercept("PATCH", "/api/boards/*").as("updateBoard");

      cy.get('.6 input[name="title"]').as("title").should("not.have.value", "");

      cy.get('.6 input[name*="columns"]').each(($input) => {
        cy.wrap($input).type(faker.word.conjunction());
      });

      cy.get("@title").clear().type(faker.word.adverb());

      cy.get('.6 button[type="submit"]').click();

      cy.wait("@updateBoard").then((interception) => {
        expect(interception.response.statusCode).to.equal(200);
      });
    });

    it("create task form submition", () => {
      cy.openModal("create");

      cy.intercept("POST", "/api/boards/columns").as("createTask");

      cy.get(".create input").each(($input) => {
        cy.wrap($input).type(faker.word.conjunction());
      });

      cy.get(".create select").select(1);

      cy.get('.create button[type="submit"]').click();

      cy.wait("@createTask").then((interception) => {
        expect(interception.response.statusCode).to.equal(201);
      });
    });
  });
});
