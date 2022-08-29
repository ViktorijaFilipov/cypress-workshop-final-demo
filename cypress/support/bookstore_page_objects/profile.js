export class ProfileActions {
  deleteBookFromTable(book_name, dialog_option) {
    // Find delete button for certain book name and delete book from table
    cy.get('.rt-tbody')
      .contains('.rt-tr-group', book_name)
      .then((row) => {
        cy.wrap(row).find('#delete-record-undefined').click();
        cy.get(`#closeSmallModal-${dialog_option}`).click();
      });
  }

  checkBookData(book_name) {
    // Navigate to book info (open book from table)
    cy.get('.rt-tbody').find('.rt-tr-group').first().contains(book_name).click();
  }
}

export const profileActions = new ProfileActions();
