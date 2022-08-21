/// <reference types="Cypress" />

import { auth } from '../../support/bookstore_page_objects/auth';
import { bookActions } from '../../support/bookstore_page_objects/book_store';
import { profileActions } from '../../support/bookstore_page_objects/profile';
import { navigateTo } from '../../support/bookstore_page_objects/navigation';

describe('Collections: Delete Book From Collection', () => {
  // Perform login
  beforeEach('Perform login', () => {
    navigateTo.login();
    cy.fixture('users').then((users) => {
      auth.login(users.user2.username, users.user2.password);
    });
  });

  // Add book to collection
  beforeEach('Add book to profile collection', () => {
    navigateTo.bookStoreFromProfile();
    cy.fixture('books').then((books) => {
      bookActions.addBookToCollection(books.collection1.SpeakingJS);
      cy.verifyWindowAlertText(`Book added to your collection.`);
    });
  });

  // Delete the book from collection
  after('Delete book from profile collection', () => {
    cy.fixture('books').then((books) => {
      profileActions.deleteBookFromTable(books.collection1.SpeakingJS, 'ok');
      cy.verifyWindowAlertText(`Book deleted.`);
    });
  });

  it('Check deleting book from profile collection - confirm deletion', () => {
    cy.fixture('books').then((books) => {
      // Navigate to user profile
      navigateTo.profile();
      // Check if book is in the collection table
      cy.get('.rt-tbody')
        .find('.rt-tr-group')
        .first()
        .should('contain', books.collection1.SpeakingJS);
      // Delete book from table - confirm deletion
      profileActions.deleteBookFromTable(books.collection1.SpeakingJS, 'ok');
      // Handle delete alert and verify message
      cy.verifyWindowAlertText(`Book deleted.`);
      // Verify that book is no longer in collection table and that table is empty
      cy.get('.rt-tbody').should('not.contain', books.collection1.SpeakingJS);
      cy.get('.rt-noData').should('contain', 'No rows found').should('be.visible');
    });
  });

  it('Check deleting book from profile collection - decline deletion', () => {
    cy.fixture('books').then((books) => {
      // Navigate to user profile
      navigateTo.profile();
      // Check if book is in the collection table
      cy.get('.rt-tbody')
        .find('.rt-tr-group')
        .first()
        .should('contain', books.collection1.SpeakingJS);
      // Cancel book deletion
      profileActions.deleteBookFromTable(books.collection1.SpeakingJS, 'cancel');
      // Verify that book is still in the table
      cy.get('.rt-tbody').should('contain', books.collection1.SpeakingJS);
    });
  });
});
