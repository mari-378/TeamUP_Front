import React from 'react';
import { render } from '@testing-library/react-native';
import Regras from '../components/Regras';

// Mock do ThemeContext
jest.mock('../contexts/ThemeContext', () => ({
  useTheme: () => ({
    temaAtual: {
      fundo: '#ffffff',
      caixaTexto: '#f1f1f1',
      textoAzul: '#0044ff'
    }
  })
}));

// Mock de useTranslation
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => {
      const traducoes = {
        'futebol.firstRule': 'Primeira regra do futebol',
        'futebol.secondRule': 'Segunda regra do futebol',
        'futebol.thirdRule': 'Terceira regra do futebol',
        'futebol.fourthRule': 'Quarta regra do futebol',
      };
      return traducoes[key] || key;
    }
  })
}));

describe('Componente Regras', () => {

  it('Deve renderizar as quatro regras do esporte passado via prop', () => {
    const { getByText } = render(<Regras esporte="futebol" />);

    expect(getByText('Primeira regra do futebol')).toBeTruthy();
    expect(getByText('Segunda regra do futebol')).toBeTruthy();
    expect(getByText('Terceira regra do futebol')).toBeTruthy();
    expect(getByText('Quarta regra do futebol')).toBeTruthy();
  });

  it('Deve chamar a tradução usando o prefixo correto baseado no esporte', () => {
    const { getByText } = render(<Regras esporte="futebol" />);

    // Se não quebrar e os textos aparecerem, as chaves `${esporte}.rule` funcionaram
    expect(getByText('Primeira regra do futebol')).toBeTruthy();
  });

});
