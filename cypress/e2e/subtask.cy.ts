describe("SubTask", () => {
  beforeEach(() => {
    cy.randomSubTask();
    cy.visit("/");
  });
  it("complete subTask", () => {
    cy.get('label[for^="my_modal_task_"] span').forceClick();

    cy.get(".task-0 label")
      .should("contain", "Subtasks")
      .next()
      .find("input")
      .as("input");

    cy.get("@input").check().should("be.checked");
    cy.get("@input").uncheck().should("not.be.checked");
  });
});
