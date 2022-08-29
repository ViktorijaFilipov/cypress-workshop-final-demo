// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import 'cypress-file-upload';
import * as api from './api/auth';
import * as utils from './utils';

const username = `user${utils.randomFiveNumbers()}`;
const password = 'Test123456!';

Cypress.Commands.add('verifyWindowAlertText', (alertText) => {
  cy.once('window:alert', (str) => {
    expect(str).to.equal(alertText);
  });
});

Cypress.Commands.add('elementVisible', (locator) => {
  cy.wrap(locator).each((index) => {
    cy.get(index).then((el) => {
      cy.get(el).should('be.visible');
    });
  });
});

Cypress.Commands.add('textExists', (text) => {
  cy.wrap(text).each((index) => {
    cy.contains(index).should('exist');
  });
});

Cypress.Commands.add('createUser', () => {
  api.createUser(username, password);
});

Cypress.Commands.add('generateToken', () => {
  api.generateToken(username, password);
});

Cypress.Commands.add('deleteUser', () => {
  api.deleteUser(username, password);
});
