import { faker } from "@faker-js/faker";

describe("Tasks", () => {
  beforeEach(() => {
    cy.seedDataBase();
    cy.randomBoard();
    cy.randomColumn();
    cy.randomTask();
  });
  it("delete task", () => {
    cy.get('label[for^="my_modal_task_"] span').click({ force: true });

    cy.get(".task-0 .dropdown ").click({ force: true });

    cy.get('label[for^="delete_"] span')
      .should("have.text", "Delete")
      .click({ force: true });

    cy.intercept("DELETE", "/api/boards/columns/tasks").as("deleteTask");

    cy.get(" .delete-board").eq(1).click({ force: true });

    cy.wait("@deleteTask").then((interception) => {
      if (interception.response) {
        expect(interception.response.statusCode).to.equal(200);
      }
      cy.get(".task-0").should("have.length", 0);
    });
  });

  it.only("Edit task", () => {
    cy.get('label[for^="my_modal_task_"] span').click({ force: true });

    cy.get(".task-0 .dropdown ").click({ force: true });

    cy.get('label[for^="edit"] span')
      .should("have.text", "Edit")
      .click({ force: true });

    cy.intercept("PATCH", "/api/boards/columns/tasks").as("patchTask");

    cy.get('[class*="edit"] input').each(($input) => {
      cy.wrap($input).type(faker.word.conjunction());
    });
    cy.get('[class*="edit"] button[type="submit"]').click();

    // cy.get(" .delete-board").eq(1).click({ force: true });

    // cy.wait("@deleteTask").then((interception) => {
    //   expect(interception.response.statusCode).to.equal(200);
    //   cy.get(".task-0").should("have.length", 0);
    // });
  });
});
