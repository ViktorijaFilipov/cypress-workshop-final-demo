/// <reference types="Cypress" />

describe('Tables: Tables actions', () => {
  beforeEach('Navigate to tables page', () => {
    // Visit tables page
    // Table records return to default after page refresh
    cy.visit('/webtables');
  });

  it('Check finding and editing a record', () => {
    // Get the table, find the row with record Alden
    cy.get('.rt-tbody')
      .contains('.rt-tr-group', 'Alden')
      .then((row) => {
        // Click on edit button for Alden record
        cy.wrap(row).find('[title="Edit"]').click();
        // Edit first and last name
        cy.get('#firstName').clear().type('Harvey');
        cy.get('#lastName').clear().type('Specter');
        // Submit edit form
        cy.get('#submit').click();
        // Assert that first and last name are changed
        cy.wrap(row).find('.rt-td').eq(0).should('contain', 'Harvey');
        cy.wrap(row).find('.rt-td').eq(1).should('contain', 'Specter');
      });
  });

  it('Check finding and deleting a record', () => {
    // Get the table, find the row with record Alden
    cy.get('.rt-tbody')
      .contains('.rt-tr-group', 'Alden')
      .then((row) => {
        // Click on delete button for Alden record
        cy.wrap(row).find('[title="Delete"]').click();
      });
    // Assert that table does not contain Alden record
    cy.get('.rt-tbody').should('not.contain', 'Alden');
    // Perform search for Alden record
    cy.get('#searchBox').type('Alden');
    // Assert that Alden record does not exist and "No rows found" message is displayed
    cy.get('.rt-tbody').should('not.contain', 'Alden');
    cy.get('.rt-noData').should('contain', 'No rows found').should('be.visible');
  });

  it('Check search for different age records', () => {
    // Define age group
    const ageGroup = [29, 39, 45, 77];
    // For each age group perform following
    cy.wrap(ageGroup).each((age) => {
      // Type age into search input field
      cy.get('#searchBox').clear().type(age);
      // If age is 77 assert that record doesn't exist in the table, otherwise assert that record is present
      if (age === 77) {
        cy.get('.rt-tbody').find('.rt-tr-group').first().should('not.contain', age);
        cy.get('.rt-noData').should('contain', 'No rows found').should('be.visible');
      } else {
        cy.get('.rt-tbody').find('.rt-tr-group').first().should('contain', age);
        cy.get('.rt-tbody').contains('.rt-tr-group', age).should('have.length', 1);
      }
    });
  });

  it('Check adding a new record - Bad code practice', () => {
    // Click on Add button
    cy.get('#addNewRecordButton').click();
    // Fill new record form
    cy.get('#firstName').type('Harvey');
    cy.get('#lastName').type('Specter');
    cy.get('#userEmail').type('specter@example.com');
    cy.get('#age').type('40');
    cy.get('#salary').type('700000');
    cy.get('#department').type('legal');
    cy.get('#submit').click();
    // Assert that new record is present in the table with correct values
    cy.get('.rt-tbody')
      .contains('.rt-tr-group', 'Harvey')
      .then((row) => {
        cy.wrap(row).find('.rt-td').eq(0).should('contain', 'Harvey');
        cy.wrap(row).find('.rt-td').eq(1).should('contain', 'Specter');
        cy.wrap(row).find('.rt-td').eq(2).should('contain', '40');
        cy.wrap(row).find('.rt-td').eq(3).should('contain', 'specter@example.com');
        cy.wrap(row).find('.rt-td').eq(4).should('contain', '700000');
        cy.wrap(row).find('.rt-td').eq(5).should('contain', 'legal');
      });
  });

  it('Check adding a new record', () => {
    // Click on Add button
    cy.get('#addNewRecordButton').click();
    cy.fixture('users').then((user) => {
      // Fill new record form
      const columnIDs = Object.keys(user.user1);
      const userData = Object.values(user.user1);

      cy.wrap(columnIDs).each((id, value) => {
        cy.get(`#${id}`).type(userData[value]);
      });
      cy.get('#submit').click();
      // Assert that new record is present in the table with correct values
      cy.get('.rt-tbody')
        .contains('.rt-tr-group', user.user1.firstName)
        .then((row) => {
          cy.wrap(userData).each((value, index) => {
            cy.wrap(row).find('.rt-td').eq(index).should('contain', value);
          });
        });
    });
  });
});
