# Projeto TeamUP

Sistema de cadastro e login de usuários e sorteio de times, desenvolvido com React Native.

---

## Tecnologias

- React Native / Expo  
- React Hook Form  
- i18next  
- Jest (testes unitários)  
- Cypress (testes E2E)  
---

## Como Rodar

> **Atenção:** É necessário ter o backend rodando para o frontend e os testes funcionarem corretamente.

### Frontend

```bash
cd TeamUP_Front
npm install
npm start

- Testes Unitários (Jest) testam componentes isolados e funções críticas.

- Rodar:

bash
npm run test


- E2E (Cypress) testam fluxos completos do usuário, como cadastro e sorteio de times.

- Rodar:

bash
npx cypress open   # Interface gráfica
npx cypress run    # Headless

Estrutura de Pastas
bash

/TeamUP_Front
  /components
  /contexts
  /constants
  /__tests__       # Testes unitários
  /cypress
    /e2e           # Testes E2E
  App.jsx
  package.json