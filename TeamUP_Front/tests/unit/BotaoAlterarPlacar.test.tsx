import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import BotaoAlterarPlacar from '../components/BotaoAlterarPlacar';
import { useTheme } from '../contexts/ThemeContext';
import CardPlacar from '../components/CardPlacar';

jest.mock('../contexts/ThemeContext', () => ({
  useTheme: jest.fn(),
}));

jest.mock('../components/CardPlacar', () => jest.fn(() => null));

describe('BotaoAlterarPlacar', () => {
  const mockSetPontos = jest.fn();
  const mockTema = { botao: '#123456', fundo: '#abcdef' };

  beforeEach(() => {
    jest.clearAllMocks();
    (useTheme as jest.Mock).mockReturnValue({ temaAtual: mockTema });
  });

  test('renderiza os botões de + e - corretamente', () => {
    render(
      <BotaoAlterarPlacar time="Time A" pontos={5} setPontos={mockSetPontos} />
    );

    ['+1', '+2', '+3', '-1', '-2', '-3'].forEach(texto => {
      expect(screen.getByText(texto)).toBeTruthy();
    });
  });

  test('chama setPontos corretamente ao aumentar os pontos', () => {
    render(
      <BotaoAlterarPlacar time="Time A" pontos={5} setPontos={mockSetPontos} />
    );

    fireEvent.press(screen.getByText('+1'));
    expect(mockSetPontos).toHaveBeenCalledWith(6);

    fireEvent.press(screen.getByText('+3'));
    expect(mockSetPontos).toHaveBeenCalledWith(8);
  });

  test('chama setPontos corretamente ao diminuir os pontos', () => {
    render(
      <BotaoAlterarPlacar time="Time A" pontos={5} setPontos={mockSetPontos} />
    );

    fireEvent.press(screen.getByText('-2'));
    expect(mockSetPontos).toHaveBeenCalledWith(3);
  });

  test('não chama setPontos se a pontuação for 0 ou o valor for maior que os pontos', () => {
    render(
      <BotaoAlterarPlacar time="Time A" pontos={0} setPontos={mockSetPontos} />
    );

    fireEvent.press(screen.getByText('-1'));
    expect(mockSetPontos).not.toHaveBeenCalled();
  });

  test('usa as cores do tema corretamente', () => {
    render(
      <BotaoAlterarPlacar time="Time A" pontos={3} setPontos={mockSetPontos} />
    );

    const botaoTouchable = screen.getByTestId('botao-aumentar-1'); 
    const botaoTexto = screen.getByText('+1');

    expect(botaoTexto.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ color: mockTema.fundo }),
      ])
    );

    expect(botaoTouchable.props.style).toEqual(
      expect.objectContaining({ backgroundColor: mockTema.botao }),
    );
  });

  test('renderiza o componente CardPlacar com os props corretos', () => {
    render(<BotaoAlterarPlacar time="Time A" pontos={10} setPontos={mockSetPontos} />);
    expect(CardPlacar).toHaveBeenCalledWith(
      expect.objectContaining({ time: 'Time A', pontuacao: 10 }),
      undefined
    );
  });
});