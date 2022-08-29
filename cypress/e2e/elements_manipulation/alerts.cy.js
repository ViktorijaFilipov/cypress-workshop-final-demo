/// <reference types="Cypress" />

describe('Alerts: Alerts actions', () => {
  beforeEach('Navigate to Alerts page', () => {
    cy.visit('/alerts');
  });

  it('Check alert confirmation', () => {
    // Create a stub method on window confirm alert
    const stub = cy.stub();
    cy.on('window:confirm', stub);
    // Click on alert confirm button and assert that alert is called with correct text
    cy.get('#confirmButton')
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith('Do you confirm action?');
      });
    // Select ok in alert
    cy.on('window:confirm', () => true);
    // Assert that confirmation text is visible
    cy.contains('You selected Ok').should('be.visible');
  });

  it('Check alert cancellation', () => {
    // Create a stub method on window confirm alert
    const stub = cy.stub();
    cy.on('window:confirm', stub);
    // Click on alert confirm button and assert that alert is called with correct text
    cy.get('#confirmButton')
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith('Do you confirm action?');
      });
    // Select cancel in alert
    cy.on('window:confirm', () => false);
    // Assert that confirmation text is visible
    cy.contains('You selected Cancel').should('be.visible');
  });
});
