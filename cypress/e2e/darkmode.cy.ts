import { faker } from "@faker-js/faker";

describe("Dark Mode", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("toggle color mode", () => {
    cy.get(".toggle-color-mode").last().as("mode");

    cy.get("@mode").check();
    cy.get('html[data-theme="light"]');
    cy.get("@mode").uncheck();
    cy.get('html[data-theme="dark"]');
  });
});
