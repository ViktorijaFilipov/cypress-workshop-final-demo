/// <reference types="Cypress" />

describe('iFrames: iFrames actions', () => {
  before('Navigate to iFrame page', () => {
    cy.visit('/frames');
  });

  it('Check iFrame content', () => {
    // Create function to return the iframe and assert that it is not empty
    const getIframeBody = () =>
      cy.get('#frame1').its('0.contentDocument.body').should('not.be.empty').then(cy.wrap);
    // Assert that iframe is visible
    getIframeBody().should('be.visible');
    // Assert that iframe contains heading with correct text
    getIframeBody().find('#sampleHeading').should('contain', 'This is a sample page');
  });
});
