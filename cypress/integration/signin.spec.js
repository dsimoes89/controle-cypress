import SignIn from '../pages/SignInPage';
import Toast from '../pages/ToastPage';

describe('SignIn', () => {
  beforeEach(() => {
    cy.viewport(1980, 1080);
    cy.visit(Cypress.env('baseURL'));
  });

  it('successfully', () => {
    cy.intercept({
      method: 'POST',
      pathname: '/signin'
    }, { fixture: 'signin/successfully.json' })
    .as('signIn');

    cy.login('john.doe@email.com', '12345678');
    cy.wait('@signIn');

    cy.get(Toast.toastMessage)
      .should('be.visible')
      .and('have.text', 'Login realizado com sucesso');

    cy.url()
      .should('equal', 'http://localhost:3000/dashboard');
  });

  it('redirect to SignUp page', () => {
    cy.get(SignIn.signUpRedirect)
      .should('be.visible')
      .click();

    cy.url()
      .should('equal', 'http://localhost:3000/cadastro');
  });

  context('Errors', () => {
    it('with user not registered', () => {
      cy.intercept({
        method: 'POST',
        pathname: '/signin'
      }, { fixture: 'signin/notRegistered.json', statusCode: 400 })
        .as('signInUserNotRegistered');

      cy.login('john.doe@email.com', '12345678');
      cy.wait('@signInUserNotRegistered');

      cy.get(Toast.toastMessage)
        .should('be.visible')
        .and('have.text', 'Usuário não encontrado');
    });

    it('with invalid email', () => {
      cy.login('john.doe@', '12345678');

      cy.get(SignIn.emailInputError)
        .should('have.text', 'Email inválido');
    });

    it('with invalid password', () => {
      cy.intercept({
        method: 'POST',
        pathname: '/signin'
      }, { fixture: 'signin/invalidPassword.json', statusCode: 400 })
        .as('signInInvalidPassword');

      cy.login('john.doe@email.com', '12345678');
      cy.wait('@signInInvalidPassword');

      cy.get(Toast.toastMessage)
        .should('be.visible')
        .and('have.text', 'Senha inválida');
    });

    it('with no data', () => {
      cy.get(SignIn.signInButton)
        .should('be.visible')
        .click();

      cy.get(SignIn.emailInputError)
        .and('have.text', 'Campo obrigatório');

      cy.get(SignIn.passwordInputError)
        .and('have.text', 'Campo obrigatório');
    });
  });
});
