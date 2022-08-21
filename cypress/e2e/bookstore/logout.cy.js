/// <reference types="Cypress" />

import { auth } from '../../support/bookstore_page_objects/auth';
import { navigateTo } from '../../support/bookstore_page_objects/navigation';

describe('Auth: Log out user', () => {
  // Perform login
  beforeEach('Perform login', () => {
    navigateTo.login();
    cy.fixture('users').then((users) => {
      auth.login(users.user2.username, users.user2.password);
    });
  });

  it('Check logging out user', () => {
    // Assert that user is on profile page
    cy.url().should('contain', '/profile');
    // Perform log out
    auth.logout();
    // Assert that user is on login page
    cy.url().should('contain', '/login');
  });
});
