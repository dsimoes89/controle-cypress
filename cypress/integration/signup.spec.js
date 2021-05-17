import SignUp from '../pages/SignUpPage';
import Toast from '../pages/ToastPage';

describe('SignUp', () => {
  beforeEach(() => {
    cy.viewport(1980, 1080);
    cy.visit(`${Cypress.env('baseURL')}/cadastro`);
  });

  it('successfully', () => {
    cy.intercept({
      method: 'POST',
      pathname: '/signup'
    }, { fixture: 'signup/successfully.json' })
      .as('signUp');

    cy.userRegister('John Doe', 'john.doe@email.com', '12345678');
    cy.wait('@signUp');

    cy.get(Toast.toastMessage)
      .should('be.visible')
      .and('have.text', 'Usuário cadastrado com sucesso');
    cy.url()
      .should('equal', 'http://localhost:3000/');
  });

  it('redirect to SignIn page', () => {
    cy.get(SignUp.signInRedirect)
      .should('be.visible')
      .click();

    cy.url()
      .should('equal', 'http://localhost:3000/');
  });

  context('Errors', () => {
    it('with duplicated user', () => {
      cy.intercept({
        method: 'POST',
        pathname: '/signup'
      }, { fixture: 'signup/duplicated.json', statusCode: 400 })
        .as('signUpDuplicated');

      cy.userRegister('John Doe', 'john.doe@email.com', '12345678');
      cy.wait('@signUpDuplicated');

      cy.get(Toast.toastMessage)
        .should('be.visible')
        .and('have.text', 'Usuário já cadastrado');
    });

    it('with invalid email', () => {
      cy.userRegister('John Doe', 'john.doe@', '12345678');

      cy.get(SignUp.emailInputError)
        .should('have.text', 'Email inválido');
    });

    it('with password less than the minimum required', () => {
      cy.userRegister('John Doe', 'user@email.com', '123456');

      cy.get(SignUp.passwordInputError)
        .should('have.text', 'Deve ter no mínimo 8 caracteres');
    });

    it('with no data', () => {
      cy.get(SignUp.signUpButton)
        .should('be.visible')
        .click();

      cy.get(SignUp.nameInputError)
        .and('have.text', 'Campo obrigatório');

      cy.get(SignUp.emailInputError)
        .and('have.text', 'Campo obrigatório');

      cy.get(SignUp.passwordInputError)
        .should('have.text', 'Deve ter no mínimo 8 caracteres');
    });
  });
});
