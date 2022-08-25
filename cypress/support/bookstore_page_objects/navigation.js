export class NavigateTo {
  login() {
    cy.visit(Cypress.env('login'));
  }

  profile() {
    cy.visit(Cypress.env('profile'));
  }

  bookStore() {
    cy.visit(Cypress.env('books'));
  }
}

export const navigateTo = new NavigateTo();
