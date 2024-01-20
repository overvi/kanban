describe("SideBar", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("side bar toggle", () => {
    cy.get("#hide-side").click();
    cy.get("#sidebar").should("not.be.visible");

    cy.get("#show-side").click();
    cy.get("#sidebar").should("be.visible");
  });

  it("side bar boards length", () => {
    cy.request("/api/boards").as("boards");

    cy.get("@boards")
      .its("body")
      .then((item) => {
        cy.get("#sidebar h1").contains(item.length);
      });
  });
});
