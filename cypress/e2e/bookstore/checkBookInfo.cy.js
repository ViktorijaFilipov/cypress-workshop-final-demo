/// <reference types="Cypress" />

import { bookActions } from '../../support/bookstore_page_objects/book_store';
import { profileActions } from '../../support/bookstore_page_objects/profile';
import { navigateTo } from '../../support/bookstore_page_objects/navigation';

describe('Collections: Check Book Info', () => {
  // Perform login
  beforeEach('Perform login', () => {
    cy.createUser();
    cy.generateToken();
  });

  // Add book to book collection
  beforeEach('Add book to profile collection', () => {
    navigateTo.bookStore();
    cy.fixture('books').then((books) => {
      bookActions.addBookToCollection(books.collection1.DesignPatternsJS);
      cy.verifyWindowAlertText(`Book added to your collection.`);
    });
  });

  // Delete user
  afterEach('Delete user', () => {
    cy.deleteUser();
  });

  it('Check book info from profile table', () => {
    // Navigate to user profile
    navigateTo.profile();
    // Load books fixture
    cy.fixture('books').then((books) => {
      // Click on book in collection to open book info
      profileActions.checkBookData(books.collection1.DesignPatternsJS);
    });
    // Define book info elements
    const bookDataElements = [
      '#ISBN-label',
      '#title-label',
      '#subtitle-label',
      '#author-label',
      '#publisher-label',
      '#pages-label',
      '#description-label',
      '#website-label',
    ];
    // Check book info elements
    cy.elementVisible(bookDataElements);
    // Define data about the book
    const bookData = [
      '9781449331818',
      'Learning JavaScript Design Patterns',
      `A JavaScript and jQuery Developer's Guide`,
      'Addy Osmani',
      `O'Reilly Media`,
      '254',
    ];
    // Check data about the book
    cy.textExists(bookData);
  });
});
