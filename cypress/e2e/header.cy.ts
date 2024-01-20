describe("Header", () => {
  beforeEach(() => {
    cy.seedDataBase();
    cy.randomBoard(5);
    cy.visit("/");
  });

  it("initial render", () => {
    cy.checkHeading(0);
  });

  it("change the header when board changed", () => {
    for (let i = 0; i !== 5; i++) {
      cy.get(".board-content button").eq(i).click({ force: true });
      cy.checkHeading(i);
    }
  });
});
