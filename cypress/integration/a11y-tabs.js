describe('A11yTabs', () => {
  before(() => cy.visit('/base'));

  it('should have all 3 tabs', () => {
    cy.get('[aria-controls="panel-1"]').should('be.visible').click();
    cy.contains('Tab 1 content').should('be.visible');
    cy.get('[aria-controls="panel-2"]').should('be.visible').click();
    cy.contains('Tab 2 content').should('be.visible');
    cy.get('[aria-controls="panel-3"]').should('be.visible').click();
    cy.contains('yahoo link').should('be.visible');
  });

  it('should focus the element last clicked', () => {
    cy.get('[aria-controls="panel-2"]').click();
    cy.get('[aria-controls="panel-2"]').should('have.focus');
  });

  it('should tab into panel', () => {
    cy.get('[aria-controls="panel-2"]').click();
    cy.get('[aria-controls="panel-2"]').tab();
    cy.get('#panel-2').should('have.focus');
  });

  it('should tab into inside panel and then back', () => {
    cy.get('[aria-controls="panel-3"]').click();
    cy.get('[aria-controls="panel-3"]').tab().tab();
    cy.get('#yahoolinktest').should('have.focus').tab();
    cy.get('#yahoolinktest2').should('have.focus').tab({ shift: true }).tab({ shift: true });
    cy.get('#panel-3').should('have.focus').tab({ shift: true });
    cy.get('[aria-controls="panel-3"]').should('have.focus');
  });

  it('should circular tab to right', () => {
    cy.get('[aria-controls="panel-1"]').click().type('Cypress.io{rightarrow}');
    cy.get('[aria-controls="panel-2"]').should('have.focus').type('Cypress.io{rightarrow}');
    cy.get('[aria-controls="panel-3"]').should('have.focus').type('Cypress.io{rightarrow}');
    cy.get('[aria-controls="panel-1"]').should('have.focus').type('Cypress.io{leftarrow}');
    cy.get('[aria-controls="panel-3"]').should('have.focus');
  });

  it('should support home and end', () => {
    cy.get('[aria-controls="panel-3"]').click().type('Cypress.io{home}');
    cy.get('[aria-controls="panel-1"]').should('have.focus').type('Cypress.io{end}');
    cy.get('[aria-controls="panel-3"]').should('have.focus');
  });

  it('should support ENTER', () => {
    cy.get('[aria-controls="panel-2"]').focus().type('Cypress.io{enter}');
    cy.contains('Tab 2 content').should('be.visible');
  });

  it('should have correct class, aria-selected, and aria-expanded', () => {
    cy.get('[aria-controls="panel-3"]')
      .focus()
      .type('Cypress.io{enter}')
      .should('have.class', 'active')
      .should('have.attr', 'aria-selected', 'true');
    cy.get('#panel-3').should('have.attr', 'aria-expanded', 'true');
    cy.get('[aria-controls="panel-2"]')
      .focus()
      .type('Cypress.io{enter}')
      .should('have.class', 'active')
      .should('have.attr', 'aria-selected', 'true');
    cy.get('#panel-2').should('have.attr', 'aria-expanded', 'true');
    cy.get('[aria-controls="panel-1"]')
      .focus()
      .type('Cypress.io{enter}')
      .should('have.attr', 'aria-selected', 'true')
      .should('have.class', 'active');
    cy.get('#panel-1').should('have.attr', 'aria-expanded', 'true');
  });
});
