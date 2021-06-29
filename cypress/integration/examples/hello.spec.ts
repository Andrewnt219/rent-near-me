describe('My First Test', () => {
  it('should visits the kitchen sink', () => {
    cy.visit('https://vasseneca.com/');

    cy.findByRole('heading', {
      name: /Vietnamese Association at Seneca College/,
    }).should('exist');
  });
});
