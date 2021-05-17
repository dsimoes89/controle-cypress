/// <reference types="cypress" />

import SignIn from '../pages/SignInPage';
import SignUp from '../pages/SignUpPage';

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

Cypress.Commands.add('userRegister' ,(name, email, password) => {
  cy.get(SignUp.nameInput)
    .should('be.visible')
    .type(name);

  cy.get(SignUp.emailInput)
    .should('be.visible')
    .type(email);

  cy.get(SignUp.passwordInput)
    .should('be.visible')
    .type(password);

  cy.get(SignUp.signUpButton)
    .should('be.visible')
    .click();
});
