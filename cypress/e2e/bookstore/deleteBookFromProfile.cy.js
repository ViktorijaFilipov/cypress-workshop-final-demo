/// <reference types="Cypress" />

import { qase } from 'cypress-qase-reporter/dist/mocha';
import { bookActions } from '../../support/bookstore_page_objects/book_store';
import { profileActions } from '../../support/bookstore_page_objects/profile';
import { navigateTo } from '../../support/bookstore_page_objects/navigation';

describe('Collections: Delete Book From Collection', () => {
  // Perform login
  beforeEach('Perform login', () => {
    cy.createUser();
    cy.generateToken();
  });

  // Add book to collection
  beforeEach('Add book to profile collection', () => {
    navigateTo.bookStore();
    cy.fixture('books').then((books) => {
      bookActions.addBookToCollection(books.collection1.SpeakingJS);
      cy.verifyWindowAlertText(`Book added to your collection.`);
    });
  });

  // Delete user
  afterEach('Delete user', () => {
    cy.deleteUser();
  });

  qase(
    3,
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
    })
  );

  qase(
    6,
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
    })
  );
});
