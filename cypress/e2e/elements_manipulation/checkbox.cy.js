/// <reference types="Cypress" />

describe('Checkboxes: Checkbox actions', () => {
    before('Navigate to checkbox page', () => {
      cy.visit('/checkbox');
    });
  
    it('Check different checkbox actions', () => {
      // Open home dropdown
      cy.get('button[aria-label="Toggle"]').click();
  
      // Open Desktop dropdown
      cy.get('button[aria-label="Toggle"]').eq(1).click();
  
      // Get all checkboxes, select Desktop folder and everything under desktop folder.
      cy.get('[type="checkbox"]').then((checkbox) => {
        cy.wrap(checkbox).eq(1).check({ force: true }).should('be.checked');
        // Verify that correct text is displayed for chosen options
        cy.contains('.text-success', 'desktop');
        cy.contains('.text-success', 'notes');
        cy.contains('.text-success', 'commands');
  
        // Uncheck notes
        cy.wrap(checkbox).eq(2).uncheck({ force: true }).should('not.be.checked');
        cy.contains('.text-success', 'notes').should('not.exist');
  
        /* Select every checkbox in the tree, uncheck Notes and then select Notes by 
            not specifying exact Notes checkbox index */
        cy.wrap(checkbox).eq(0).check({ force: true }).should('be.checked');
        cy.wrap(checkbox).eq(2).uncheck({ force: true }).should('not.be.checked');
  
        cy.wrap(checkbox).check({ force: true }).should('be.checked');
        cy.contains('.text-success', 'notes');
      });
    });
  });
  