describe('Vertical orientation', () => {
  before(() => cy.visit('/vertical'));

  it('should have correct aria-orientation', () => {
    cy.get('.tab-list').should('have.attr', 'aria-orientation', 'vertical');
  });

  it('should tab into inside panel and then back', () => {
    cy.get('[aria-controls="panel-3"]').click();
    cy.get('[aria-controls="panel-3"]').tab().tab();
    cy.get('#yahoolinktest').should('have.focus').tab();
    cy.get('#yahoolinktest2').should('have.focus').tab({ shift: true }).tab({ shift: true });
    cy.get('#panel-3').should('have.focus').tab({ shift: true });
    cy.get('[aria-controls="panel-3"]').should('have.focus');
  });

  it('should provide circular tabbing', () => {
    cy.get('[aria-controls="panel-1"]').click().type('Cypress.io{downArrow}');
    cy.get('[aria-controls="panel-2"]').should('have.focus').type('Cypress.io{downArrow}');
    cy.get('[aria-controls="panel-3"]').should('have.focus').type('Cypress.io{downArrow}');
    cy.get('[aria-controls="panel-1"]').should('have.focus').type('Cypress.io{upArrow}');
    cy.get('[aria-controls="panel-3"]').should('have.focus');
  });

  it('should ignore left/right navigation in vertical orientation', () => {
    cy.get('[aria-controls="panel-1"]').click().type('Cypress.io{rightArrow}');
    cy.get('[aria-controls="panel-2"]').not('have.focus');
    cy.get('[aria-controls="panel-1"]').click().type('Cypress.io{leftArrow}');
    // if horizontal and on tab 1 -- left would go to last so 3
    cy.get('[aria-controls="panel-3"]').not('have.focus');
  });
  it('should still support home and end', () => {
    cy.get('[aria-controls="panel-3"]').click().type('Cypress.io{home}');
    cy.get('[aria-controls="panel-1"]').should('have.focus').type('Cypress.io{end}');
    cy.get('[aria-controls="panel-3"]').should('have.focus');
  });
});
