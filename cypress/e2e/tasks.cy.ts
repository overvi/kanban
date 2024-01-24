import { faker } from "@faker-js/faker";

describe("Tasks", () => {
  beforeEach(() => {
    cy.randomTask();
    cy.visit("/");
  });

  it.only("create task form submition", () => {
    cy.openModal("create");

    cy.intercept("POST", "/api/boards/columns").as("createTask");

    cy.get(".create input").each(($input) => {
      cy.wrap($input).type(faker.word.conjunction());
    });

    cy.get(".create select").select(1);

    cy.get('.create button[type="submit"]').click();

    cy.checkResponseStatus(201, "@createTask");
  });

  it("delete task", () => {
    cy.get('label[for^="my_modal_task_"] ').invoke("show");

    cy.get(".task-0 .dropdown ").forceClick();

    cy.get('label[for^="delete_"] span')
      .should("have.text", "Delete")
      .forceClick();

    cy.intercept("DELETE", "/api/boards/columns/tasks").as("deleteTask");

    cy.get(" .delete-board").eq(1).forceClick();

    cy.checkResponseStatus(200, "@deleteTask");
    cy.get(".task-0").should("have.length", 0);
  });

  it("Edit task", () => {
    cy.get('label[for^="my_modal_task_"] span').forceClick();

    cy.get(".task-0 .dropdown ").forceClick();

    cy.get('label[for^="edit"] span').should("have.text", "Edit").forceClick();

    cy.intercept("PATCH", "/api/boards/columns/tasks").as("patchTask");

    cy.get('[class*="edit"] input').each(($input) => {
      cy.wrap($input).clear();
      cy.wrap($input).type(faker.word.conjunction());
    });
    cy.get('[class*="edit"] button[type="submit"]').click();
  });
});
