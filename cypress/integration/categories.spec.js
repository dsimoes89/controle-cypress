import Category from '../pages/CategoryPage';

describe('Categories', () => {
  before(() => {
    // cy.viewport(1980, 1080);
    // cy.visit(Cypress.env('baseURL'));
    // cy.login(Cypress.env('userEmail'), Cypress.env('userPassword'));
    // cy.toastCloseButton();
    // cy.profileSelect('categories');
    cy.task('dbQuery', {
      'query': "INSERT INTO categories(user_id, name, created_at, updated_at) VALUES(1, 'Testee', '01/01/2021', '01/01/2021');"
    });
  });

  it('validate empty list', () => {

  });

  // it('add succesfully', () => {
  //   cy.intercept({
  //     method: 'POST',
  //     pathname: '/category'
  //   }, { fixture: 'categories/addSuccessfully.json' })
  //     .as('addCategory');

  //   cy.get(Category.categoryModalOpenButton)
  //     .should('be.visible')
  //     .click();

  //   cy.get(Category.categoryModalInput)
  //     .should('be.visible')
  //     .type('Teste')

  //   cy.get(Category.categoryModalAddButton)
  //     .should('be.visible')
  //     .click();
  //   cy.wait('@addCategory');

  //   cy.toastValidateMessage('Categoria cadastrada')
  // });
});

