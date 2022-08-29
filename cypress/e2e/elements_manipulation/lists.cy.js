/// <reference types="Cypress" />

describe('Lists: Lists actions', () => {
  beforeEach('Navigate to lists page', () => {
    cy.visit('/select-menu');
  });

  it('Check selection of all list options - select method - colors menu', () => {
    // Load colors fixure json file to assert if all colors are present
    cy.fixture('colors').then((colors) => {
      // Get all options in the menu, get each option and indexes
      cy.get('#oldSelectMenu option').each((option, index) => {
        // Get option text
        const optionText = option.text();
        // Select each option and assert that it has correct option value and text
        cy.get('#oldSelectMenu')
          .select(optionText)
          .should('have.value', option.val())
          .contains(colors[index]);
      });
    });
  });

  it('Check selection of single list option - click method - title menu', () => {
    // Click on dropdown
    cy.get('#selectOne').click();
    // Select one option
    cy.get('#react-select-3-option-0-4').click();
    // Assert that dropdown has correct text after selection
    cy.get('#selectOne').contains('Prof.');
  });
});
