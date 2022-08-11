/// <reference types="Cypress" />

describe('Tooltips: Tooltips actions', () => {
    beforeEach('Navigate to Tooltips page', () => {
        cy.visit('/tool-tips');
    });

    it('Check button tooltip hover', () => {
        //Perform hover over button element
        cy.get('#toolTipButton').trigger('mouseover');
        //Assert that tooltip is visible and contains expected text
        cy.get('.tooltip-inner').should('be.visible').and('contain', 'You hovered over the Button');
    });

    it('Check input tooltip hover', () => {
        //Perform hover over input element
        cy.get('#toolTipTextField').trigger('mouseover');
        //Assert that tooltip is visible and contains expected text
        cy.get('.tooltip-inner').should('be.visible').and('contain', 'You hovered over the text field');
    });

    it('Check text tooltip hover', () => {
        //Perform hover over text element
        cy.contains('Contrary').trigger('mouseover');
        //Assert that tooltip is visible and contains expected text
        cy.get('.tooltip-inner').should('be.visible').and('contain', 'You hovered over the Contrary');
    });
});