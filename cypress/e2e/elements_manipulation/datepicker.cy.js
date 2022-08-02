/// <reference types="Cypress" />

describe('Date picker: Date picker actions', () => {
    beforeEach('Navigate to date picker page', () => {
      cy.visit('/date-picker');
    });
  
    it('Check fixed date selection', () => {
      // Open date picker
      cy.get('#datePickerMonthYearInput').click();
      // Select year
      cy.get('.react-datepicker__year-select').select('2030');
      // Select month
      cy.get('.react-datepicker__month-select').select('June');
      // Select day
      cy.get(`.react-datepicker__day--0${23}`).first().click();
      // Assert input date value
      cy.get('#datePickerMonthYearInput').should('have.value', '06/23/2030');
    });
  
    it('Check dynamic date selection', () => {
      // Increment Date by 1 month
      const date = new Date();
      date.setMonth(date.getMonth() + 1);
      // Set date to 23rd day of next month
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = 23;
      // Open date picker
      cy.get('#datePickerMonthYearInput').click();
      // Select year
      cy.get('.react-datepicker__year-select').select(`${year}`);
      // Select month
      cy.get('.react-datepicker__month-select').select(`${month}`);
      // Select day
      cy.get(`.react-datepicker__day--0${day}`).first().click();
      // Assert input date value
      cy.get('#datePickerMonthYearInput').should(
        'have.value',
        `${`${month + 1}`.padStart(2, '0')}/${day}/${year}`
      );
    });
  
    it('Check applying date value directly in the input field', () => {
      // Clear date input and type new date
      cy.get('#datePickerMonthYearInput').clear().type('06/23/2030');
      // Assert input date value
      cy.get('#datePickerMonthYearInput').should('have.value', '06/23/2030');
    });
  });
  