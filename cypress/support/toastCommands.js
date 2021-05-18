/// <reference types="cypress" />

import Toast from '../pages/ToastPage';

Cypress.Commands.add('toastValidateMessage', (message) => {
  cy.get(Toast.toastMessage)
    .should('be.visible')
    .and('have.text', message);
});

Cypress.Commands.add('toastCloseButton', () => {
  cy.get(Toast.toastCloseButton)
    .should('be.visible')
    .click();
});
