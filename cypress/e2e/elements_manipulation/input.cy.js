/// <reference types="Cypress" />

describe('Inputs: Input actions', () => {
    before('Navigate to input page', () => {
      cy.visit('/text-box');
    });
  
    it('Check different input actions', () => {
      // Fill the form details
      cy.get('#userName').type('Arya Stark');
      cy.get('#userEmail').type('noone@example.com');
      cy.get('#currentAddress').type('Braavos, East of Westeros');
      cy.get('#permanentAddress').type('Winterfell,{enter}Kingdom of the North,{enter}Westeros');
  
      // Submit form and check if expected text is dispalyed
      cy.get('#submit').click();
  
      // Example assertions - Verify that we got correct output for name and email
      cy.get('#name').contains('Arya Stark');
      cy.get('#email').contains('noone@example.com');
  
      // Edit username input field, submit form and assert that username is changed
      cy.get('#userName').clear().type('Jon Snow');
      cy.get('#submit').click();
      cy.get('#name').contains('Jon Snow');
    });
  });
  