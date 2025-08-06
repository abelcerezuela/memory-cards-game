describe('HomeComponent', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should show the application title', () => {
    cy.get('h1.home__title').should('contain.text', 'Memory Cards Game');
  });

  it('should have the username input', () => {
    cy.get('input#username').should('exist');
  });

  it('should show error if the field is empty and tapped', () => {
    cy.get('input#username').focus().blur();
    cy.get('.home__input--alert').should('contain.text', 'User name is required');
  });

  it('should display error if name is less than 4 characters', () => {
    cy.get('input#username').type('abc').blur();
    cy.get('.home__input--alert').should('contain.text', 'User name should be at least 4 characters long');
  });

  it('should enable the button and navigate if the name is valid', () => {
    cy.get('input#username').type('Abel93');
    cy.get('form').submit();
    cy.url().should('include', '/game/Abel93');
  });
});
