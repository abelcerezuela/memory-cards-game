describe('GameComponent - Start', () => {
  beforeEach(() => {
    cy.visit('/game/Abel93');
  });

  it('should display the player name and historical score', () => {
    cy.get('.game__player').should('contain.text', 'Player: Abel93');
    cy.get('.game__score').should('contain.text', 'Historical score:');
  });

  it('should show the level selector and the start button', () => {
    cy.get('select#level').should('exist');
    cy.get('app-button button').contains('Start game').should('exist');
  });

  it('should allow changing the level', () => {
    cy.get('select#level').select('medium');
    cy.get('select#level').should('have.value', 'medium');
  });

  it('should start the game when you click "Start game"', () => {
    cy.get('app-button button').contains('Start game').click();
    cy.get('.game__question').should('exist');
  });
});

describe('GameComponent - During the game', () => {
  beforeEach(() => {
    cy.visit('/game/Abel93');
    cy.get('app-button button').contains('Start game').click();
    cy.wait(10000);
  });

  it('should show the target number and the grid', () => {
    cy.get('.game__question').should('contain.text', 'Where is number');
    cy.get('.game__grid').should('exist');
    cy.get('.game__cell').should('have.length', 9);
  });
});

