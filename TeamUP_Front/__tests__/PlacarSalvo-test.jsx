import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import PlacarSalvo from '../components/PlacarSalvo';

// Mock do ThemeContext
jest.mock('../contexts/ThemeContext', () => ({
  useTheme: () => ({
    temaAtual: {
      caixaTexto: '#fafafa',
      texto: '#000'
    }
  })
}));

// Mock de useTranslation
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => {
      if (key === 'score.period') return 'Período';
      return key;
    }
  })
}));

describe('Componente PlacarSalvo', () => {

  it('Deve mostrar o período recebido via prop', () => {
    const { getByText } = render(<PlacarSalvo periodo="3" pontuacao={10} />);
    
    expect(getByText('3')).toBeTruthy();
  });

  it('Deve mostrar a pontuação recebida via prop', () => {
    const { getByText } = render(<PlacarSalvo periodo="2" pontuacao={25} />);
    
    expect(getByText('25')).toBeTruthy();
  });

  it('Deve renderizar o texto traduzido "Período"', () => {
    const { getByText } = render(<PlacarSalvo periodo="1" pontuacao={5} />);
    
    expect(getByText('Período')).toBeTruthy();
  });

});
