/// <reference types="Cypress" />

import { qase } from 'cypress-qase-reporter/dist/mocha';
import { auth } from '../../support/bookstore_page_objects/auth';
import { navigateTo } from '../../support/bookstore_page_objects/navigation';

describe('Auth: Log out user', () => {
  // Perform login
  beforeEach('Perform login', () => {
    cy.createUser();
    cy.generateToken();
  });

  // Delete user
  afterEach('Delete user', () => {
    cy.deleteUser();
  });

  qase(
    11,
    it('Check logging out user', () => {
      // Navigate to user profile
      navigateTo.profile();
      // Perform log out
      auth.logout();
      // Assert that user is on login page
      cy.url().should('contain', Cypress.env('login'));
    })
  );
});
