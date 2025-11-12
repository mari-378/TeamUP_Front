import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import MudarTema from '../components/MudarTema';
import { useTheme } from '../contexts/ThemeContext';

// mock do contexto de tema
jest.mock('../contexts/ThemeContext', () => ({
  useTheme: jest.fn()
}));

describe('Componente MudarTema', () => {
  
  it('Deve renderizar o botão com o texto "Mudar tema"', () => {
    useTheme.mockReturnValue({
      alternarTema: jest.fn(),
      temaAtual: {
        fundo: '#000',
        texto: '#fff'
      }
    });

    const { getByText } = render(<MudarTema />);
    expect(getByText('Mudar tema')).toBeTruthy();
  });

  it('Deve chamar alternarTema ao clicar', () => {
    const mockAlternar = jest.fn();

    useTheme.mockReturnValue({
      alternarTema: mockAlternar,
      temaAtual: {
        fundo: '#000',
        texto: '#fff'
      }
    });

    const { getByText } = render(<MudarTema />);
    const botao = getByText('Mudar tema');

    fireEvent.press(botao);

    expect(mockAlternar).toHaveBeenCalled();
  });

  it('Deve aplicar as cores do tema atual', () => {
    useTheme.mockReturnValue({
      alternarTema: jest.fn(),
      temaAtual: {
        fundo: '#123456',
        texto: '#abcdef'
      }
    });

    const { getByText } = render(<MudarTema />);
    const botao = getByText('Mudar tema');

    expect(botao.props.style.color).toBe('#abcdef');
  });

});
