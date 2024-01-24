import { faker } from "@faker-js/faker";

declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
      openAndCloseModal(value: string): Chainable<Element>;
      openModal(value: string): Chainable<Element>;
      seedDataBase(): Chainable<Element>;
      randomBoard(howMany?: number): Chainable<Element>;
      randomColumn(howMany?: number): Chainable<Element>;
      randomTask(): Chainable<Element>;
      checkHeading(index: number): Chainable<Element>;
      checkResponseStatus(status: number, alias: string): Chainable<Element>;
      forceClick(): Chainable<Subject>;
      randomSubTask();
    }
  }
}

Cypress.Commands.add("openModal", (modalId) => {
  cy.get(`label[for="${modalId}"] span`).last().click({ force: true });
  cy.get(`.modal .modal-box`).should("be.visible");
});

Cypress.Commands.add("openAndCloseModal", (modalId) => {
  cy.openModal(modalId);

  // You can customize the text inside the contains method
  cy.get(`label[for="${modalId}"]`).contains("Close").click({ force: true });

  cy.get(`.modal .modal-box`).should("not.be.visible");
});

Cypress.Commands.add("seedDataBase", () => {
  cy.task("queryDB", "DELETE FROM board");
  cy.task("queryDB", "DELETE FROM `column`");
  cy.task("queryDB", "DELETE FROM task");
  cy.task("queryDB", "DELETE FROM subtask");
});

Cypress.Commands.add("randomBoard", (howMany: number = 1) => {
  for (let i = 0; i !== howMany; i++) {
    cy.task(
      "queryDB",
      `INSERT INTO board (title) VALUES ("${faker.animal.cat()}")`
    );
  }
});

Cypress.Commands.add("randomColumn", (howMany: number = 5) => {
  cy.randomBoard();
  for (let i = 0; i !== howMany; i++) {
    cy.task(
      "queryDB",
      'INSERT INTO `column` (title, boardId) SELECT "Title", id FROM board ORDER BY id LIMIT 1;'
    );
  }
});

Cypress.Commands.add("randomTask", () => {
  cy.randomBoard();
  cy.randomColumn();
  for (let i = 0; i !== 1; i++) {
    cy.task(
      "queryDB",
      'INSERT INTO task (title, description, `order` , columnId ) SELECT "Task Title", "Task Description", 1 , id FROM `column` ORDER BY id LIMIT 1;'
    );
  }
});

Cypress.Commands.add("checkHeading", (index: number) => {
  cy.get(".board-content")
    .eq(index)
    .invoke("text")
    .then((boardContentText) => {
      cy.get(".Heading").invoke("text").should("equal", boardContentText);
    });
});

Cypress.Commands.add("checkResponseStatus", (status: number, alias: string) => {
  cy.wait(alias).then((interception) => {
    if (interception.response) {
      expect(interception.response.statusCode).to.equal(status);
    }
  });
});

Cypress.Commands.add(
  "forceClick",
  { prevSubject: "element" },
  (subject: JQuery, options?: any) => {
    cy.wrap(subject).click({ force: true, ...options });
  }
);

Cypress.Commands.add("randomSubTask", () => {
  cy.randomBoard();
  cy.randomColumn();
  cy.randomTask();
  for (let i = 0; i !== 1; i++) {
    cy.task(
      "queryDB",
      'INSERT INTO subtask (title, completed, taskId ) SELECT "subTask title", false, id FROM task ORDER BY id LIMIT 1;'
    );
  }
});
