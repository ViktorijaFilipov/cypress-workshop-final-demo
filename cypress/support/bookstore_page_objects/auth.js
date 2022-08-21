export class Auth {
    login(user_name, password) {
      cy.get('#userName').type(user_name);
      cy.get('#password').type(password);
      cy.get('#login').click();
    }
  
    logout() {
      cy.get('#submit').should('contain', 'Log out').click();
    }
  }
  
  export const auth = new Auth();
  