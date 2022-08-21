export class BookActions {
    addBookToCollection(book_name) {
      cy.contains(book_name).click();
      cy.get('.text-right > #addNewRecordButton').click();
    }
  
    searchCollection(book_name) {
      cy.get('#searchBox').type(book_name);
    }
  }
  
  export const bookActions = new BookActions();
  