/// <reference types="Cypress" />

describe('Upload: Upload actions', () => {
    before('Navigate to upload page', () => {
      cy.visit('/upload-download');
    });
  
    it('Check upload action', () => {
      // Upload file
      cy.get('#uploadFile').attachFile('pic.png');
      // Assert that path message is displayed
      cy.get('#uploadedFilePath').should('have.text', `C:\\fakepath\\pic.png`);
    });
  });
  