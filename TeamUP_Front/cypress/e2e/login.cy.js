describe('Tela de Login', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8081/login');
  });

  it('Deve exibir aviso ao tentar logar sem aceitar os termos', () => {
    cy.get('[data-testid="input-email"]').type('usuario@teste.com');
    cy.get('[data-testid="input-senha"]').type('SenhaForte123');
    cy.get('[data-testid="botao-login"]').click();

    cy.on('window:alert', (text) => {
      expect(text).to.contains('precisa aceitar os termos');
    });
  });

  it('Deve logar com sucesso após aceitar os termos', () => {
    cy.get('[data-testid="input-email"]').type('usuario@teste.com');
    cy.get('[data-testid="input-senha"]').type('SenhaForte123');

    // Aceita os termos
    cy.get('[data-testid="checkbox-termos"]').click();

    // Clica para logar
    cy.get('[data-testid="botao-login"]').click();

    cy.url().should('include', '/funcionalidades');
  });
});
