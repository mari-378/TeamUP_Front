import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { useTheme } from '../contexts/ThemeContext';
import MudarLingua from '../components/MudarLingua';

// precisamos mockar o i18n e o tema usados no componente
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    i18n: {
      language: 'pt-BR',
      changeLanguage: jest.fn(),
    },
  }),
}));

jest.mock('../contexts/ThemeContext', () => ({
  useTheme: () => ({
    temaAtual: {
      caixaTexto: '#fff',
      textoAzul: '#000'
    }
  }),
}));

describe('Componente MudarLingua', () => {
  it('Deve exibir EN quando o idioma atual é pt-BR', () => {
    const { getByText } = render(<MudarLingua />);
    expect(getByText('EN')).toBeTruthy();
  });

  it('Deve chamar changeLanguage ao clicar', () => {
    const mockChange = jest.fn();

    jest.spyOn(require('react-i18next'), 'useTranslation').mockReturnValue({
      i18n: {
        language: 'pt-BR',
        changeLanguage: mockChange
      }
    });

    const { getByText } = render(<MudarLingua />);

    const botao = getByText('EN');
    fireEvent.press(botao);

    expect(mockChange).toHaveBeenCalledWith('en-US');
  });

  it('Quando o idioma é en-US, deve exibir PT', () => {
    jest.spyOn(require('react-i18next'), 'useTranslation').mockReturnValue({
      i18n: {
        language: 'en-US',
        changeLanguage: jest.fn()
      }
    });

    const { getByText } = render(<MudarLingua />);
    expect(getByText('PT')).toBeTruthy();
  });
});



