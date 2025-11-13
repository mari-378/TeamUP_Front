describe('Tela de Sorteio', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8081/sorteio');
  });

  it('Deve adicionar jogadores e realizar sorteio de times', () => {
    // Adiciona jogadores com diferentes habilidades
    cy.get('[data-testid="input-nome-jogador"]').type('João');
    cy.get('[data-testid="estrela-habilidade-4"]').click(); 
    cy.get('[data-testid="btn-adicionar-jogador"]').click();

    cy.get('[data-testid="input-nome-jogador"]').type('Maria');
    cy.get('[data-testid="estrela-habilidade-5"]').click(); 
    cy.get('[data-testid="btn-adicionar-jogador"]').click();

    cy.get('[data-testid="input-nome-jogador"]').type('Carlos');
    cy.get('[data-testid="estrela-habilidade-3"]').click(); 
    cy.get('[data-testid="btn-adicionar-jogador"]').click();

    // Faz o sorteio
    cy.get('[data-testid="btn-sortear"]').click();

    // Verifica se os times foram renderizados
    cy.contains('Time 1').should('exist');
    cy.contains('Time 2').should('exist');
  });

  it('Deve limpar os times ao clicar em resetar', () => {
    cy.get('[data-testid="btn-resetar"]').click();
    cy.contains('Time 1').should('not.exist');
  });
});
