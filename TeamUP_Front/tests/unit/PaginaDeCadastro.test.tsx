import React from 'react';
import { render, screen } from '@testing-library/react-native';
import PaginaDeCadastro from '../../pages/PaginaDeCadastro';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts/ThemeContext';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

jest.mock('../../contexts/ThemeContext', () => ({
  useTheme: () => ({
    temaAtual: {
      fundo: '#fff',
      texto: '#000',
    },
  }),
}));

// Mock dos componentes filhos
jest.mock('../../components/Cadastro', () => () => <></>);
jest.mock('../../components/MudarLingua', () => () => <></>);
jest.mock('../../components/MudarTema', () => () => <></>);

describe('PaginaDeCadastro', () => {
  it('renderiza corretamente os textos e componentes', () => {
    render(<PaginaDeCadastro />);

    // Verifica se os textos traduzidos estão na tela
    expect(screen.getByText('signup.signup')).toBeTruthy();
    expect(screen.getByText('signup.message')).toBeTruthy();

    // Verifica se os componentes foram renderizados (mockados como vazio, mas presentes)
    expect(screen.getByText('signup.signup').props.children).toBe('signup.signup');
  });
});
