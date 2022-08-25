export const generateToken = (username, password) =>
  cy
    .request({
      method: 'POST',
      url: `${Cypress.env('apiUrl')}${Cypress.env('apiGenerateToken')}`,
      body: {
        userName: username,
        password,
      },
    })
    .then((response) => {
      cy.setCookie('token', response.body.token);
      cy.setCookie('expires', response.body.expires);
    });

export const createUser = (username, password) =>
  cy
    .request({
      method: 'POST',
      url: `${Cypress.env('apiUrl')}${Cypress.env('apiUser')}`,
      body: {
        userName: username,
        password,
      },
    })
    .then((response) => {
      cy.setCookie('userID', response.body.userID);
      cy.setCookie('UserName', response.body.username);
    });

export const deleteUser = (username, password) => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('apiUrl')}${Cypress.env('apiLogin')}`,
    body: {
      userName: username,
      password,
    },
  }).then((response) => {
    cy.request({
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${response.body.token}`,
      },
      url: `${Cypress.env('apiUrl')}${Cypress.env('apiUser')}/${response.body.userId}`,
    });
  });
};
