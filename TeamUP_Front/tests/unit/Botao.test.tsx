import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Botao from '../../components/Botao';
import { useTheme } from '../../contexts/ThemeContext';

jest.mock('../../contexts/ThemeContext', () => ({
  useTheme: jest.fn(),
}));

describe('Botao', () => {
  const mockOnPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renderiza o título corretamente', () => {
    (useTheme as unknown as jest.Mock).mockReturnValue({
      temaAtual: { botao: '#000', fundo: '#fff' },
    });

    const { getByText } = render(<Botao title="Clique aqui" onPress={mockOnPress} />);
    expect(getByText('Clique aqui')).toBeTruthy();
  });

  test('chama a função onPress quando pressionado', () => {
    (useTheme as unknown as jest.Mock).mockReturnValue({
      temaAtual: { botao: '#000', fundo: '#fff' },
    });

    const { getByText } = render(<Botao title="Pressione" onPress={mockOnPress} />);
    fireEvent.press(getByText('Pressione'));

    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  test('usa as cores corretas do tema', () => {
    const mockTema = { botao: '#123456', fundo: '#abcdef' };
    (useTheme as unknown as jest.Mock).mockReturnValue({ temaAtual: mockTema });

    const { getByText } = render(<Botao title="Tema Teste" onPress={mockOnPress} />);
    const texto = getByText('Tema Teste');

    expect(texto.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ color: mockTema.fundo }),
      ])
    );
  });
});
