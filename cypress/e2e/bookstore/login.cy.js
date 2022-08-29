/// <reference types="Cypress" />

import { qase } from 'cypress-qase-reporter/dist/mocha';
import { auth } from '../../support/bookstore_page_objects/auth';
import { navigateTo } from '../../support/bookstore_page_objects/navigation';

describe('Auth: Login user', () => {
  // Navigate to login page
  beforeEach('Navigate to Login page', () => {
    navigateTo.login();
  });
  qase(
    7,
    it('Check valid user credentials', () => {
      // Load users fixture
      cy.fixture('users').then((users) => {
        // Perform login
        auth.login(users.user2.username, users.user2.password);
      });
      // Verify that user is redirected to profile page (user is logged in)
      cy.url().should('contain', Cypress.env('profile'));
    })
  );

  qase(
    8,
    it('Check invalid user credentials', () => {
      // Perform login
      auth.login('invalid345', 'invalid345');
      // Verify that user is still on login page (user is not logged in)
      cy.url().should('contain', Cypress.env('login'));
      // Verify that error message is displayed
      cy.get('#output').should('contain', 'Invalid username or password!');
    })
  );

  qase(
    9,
    it('Check login with invalid username and valid password', () => {
      // Load users fixture
      cy.fixture('users').then((users) => {
        // Perform login
        auth.login('invalid345', users.user2.password);
      });
      // Verify that user is still on login page (user is not logged in)
      cy.url().should('contain', Cypress.env('login'));
      // Verify that error message is displayed
      cy.get('#output').should('contain', 'Invalid username or password!');
    })
  );

  qase(
    10,
    it('Check login with valid username and invalid password', () => {
      // Load users fixture
      cy.fixture('users').then((users) => {
        // Perform login
        auth.login(users.user2.username, 'invalid345');
      });
      // Verify that user is still on login page (user is not logged in)
      cy.url().should('contain', Cypress.env('login'));
      // Verify that error message is displayed
      cy.get('#output').should('contain', 'Invalid username or password!');
    })
  );
});
