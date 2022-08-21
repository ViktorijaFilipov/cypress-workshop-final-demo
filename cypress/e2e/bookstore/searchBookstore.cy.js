/// <reference types="Cypress" />

import { auth } from '../../support/bookstore_page_objects/auth';
import { bookActions } from '../../support/bookstore_page_objects/book_store';
import { navigateTo } from '../../support/bookstore_page_objects/navigation';

describe('Bookstore: Search For Book', () => {
  // Perform login
  beforeEach('Perform login', () => {
    navigateTo.login();
    cy.fixture('users').then((users) => {
      auth.login(users.user2.username, users.user2.password);
    });
  });

  it('Check searching for existing book in book store', () => {
    // Navigate to bookstore
    navigateTo.bookStoreFromProfile();
    // Load books fixture
    cy.fixture('books').then((books) => {
      // Perform book search
      bookActions.searchCollection(books.collection1.DesignPatternsJS);
      // Verify that there is a book in filtered table (in search result)
      cy.get('.rt-tbody')
        .find('.rt-tr-group')
        .first()
        .should('contain', books.collection1.DesignPatternsJS);
    });
  });

  it('Check searching for non-existing book in book store', () => {
    // Define invalid book name
    const invalid_book_name = 'Game of Thrones';
    // Navigate to bookstore
    navigateTo.bookStoreFromProfile();
    // Perform book search
    bookActions.searchCollection(invalid_book_name);
    // Assert that there are no search results (no book in the table and table is empty)
    cy.get('.rt-tbody').should('not.contain', invalid_book_name);
    cy.get('.rt-noData').should('contain', 'No rows found').should('be.visible');
  });
});
