/// <reference types="cypress" />

import SignIn from '../pages/SignInPage';

Cypress.Commands.add('login', (email, password) => {
  cy.get(SignIn.emailInput)
    .should('be.visible')
    .type(email);

  cy.get(SignIn.passwordInput)
    .should('be.visible')
    .type(password);

  cy.get(SignIn.signInButton)
    .should('be.visible')
    .click();
});
