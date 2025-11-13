describe('Tela de Cadastro', () => {
  beforeEach(() => {
    // Visita a página de cadastro (ajuste a rota conforme seu app web)
    cy.visit('http://localhost:8081/cadastro');
  });

  it('Deve preencher e enviar o formulário de cadastro com sucesso', () => {
    cy.get('[data-testid="input-nome"]').type('Maria Teste');
    cy.get('[data-testid="input-email"]').type('maria@teste.com');
    cy.get('[data-testid="input-senha"]').type('SenhaForte123');
    cy.get('[data-testid="input-confirmar-senha"]').type('SenhaForte123');

    // Simula preenchimento da data de nascimento e gênero
    cy.get('[data-testid="input-dia"]').type('10');
    cy.get('[data-testid="input-mes"]').type('06');
    cy.get('[data-testid="input-ano"]').type('2000');
    cy.get('[data-testID="input-genero-F"]').click(); 
    cy.get('[data-testID="input-genero-M"]').click(); 
    cy.get('[data-testID="input-genero-Outro"]').click();

    // Envia o formulário
    cy.get('[data-testid="btn-cadastrar"]').click();

    // Aguarda redirecionamento (ou resposta)
    cy.url().should('include', '/funcionalidades');
  });
});
