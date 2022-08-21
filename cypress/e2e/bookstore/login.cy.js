/// <reference types="Cypress" />

import { auth } from '../../support/bookstore_page_objects/auth';
import { navigateTo } from '../../support/bookstore_page_objects/navigation';

describe('Auth: Login user', () => {
  // Navigate to login page
  beforeEach('Navigate to Login page', () => {
    navigateTo.login();
  });

  it('Check valid user credentials', () => {
    // Load users fixture
    cy.fixture('users').then((users) => {
    // Perform login
    auth.login(users.user2.username, users.user2.password);
    });
    // Verify that user is redirected to profile page (user is logged in)
    cy.url().should('contain', '/profile');
  });

  it('Check invalid user credentials', () => {
      // Perform login
      auth.login('invalid345', 'invalid345');
    // Verify that user is still on login page (user is not logged in)
    cy.url().should('contain', '/login');
    // Verify that error message is displayed
    cy.get('#output').should('contain', 'Invalid username or password!');
  });

  it('Check login with invalid username and valid password', () => {
    // Load users fixture
    cy.fixture('users').then((users) => {
      // Perform login
      auth.login('invalid345', users.user2.password);
    });
    // Verify that user is still on login page (user is not logged in)
    cy.url().should('contain', '/login');
    // Verify that error message is displayed
    cy.get('#output').should('contain', 'Invalid username or password!');
  });

  it('Check login with valid username and invalid password', () => {
    // Load users fixture
    cy.fixture('users').then((users) => {
      // Perform login
      auth.login(users.user2.username, 'invalid345');
    });
    // Verify that user is still on login page (user is not logged in)
    cy.url().should('contain', '/login');
    // Verify that error message is displayed
    cy.get('#output').should('contain', 'Invalid username or password!');
  });
});
