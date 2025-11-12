import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SelecaoMaxJogadores from '../components/SelecaoMaxJogadores';

//  Mock do router
const mockPush = jest.fn();
jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: mockPush
  })
}));

//  Mock do tema
jest.mock('../contexts/ThemeContext', () => ({
  useTheme: () => ({
    temaAtual: {
      fundo: '#fff',
      texto: '#000'
    }
  })
}));

//  Mock da tradução
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => {
      const traducao = {
        'selectSport.title': 'Escolha o esporte',
        'sports.football': 'Futebol',
        'sports.volleyball': 'Vôlei',
        'sports.basketball': 'Basquete',
      };
      return traducao[key] || key;
    },
  }),
}));

//  Mock do Botao
jest.mock('../components/Botao', () => {
  return ({ title, onPress }) => {
    const { Text, TouchableOpacity } = require('react-native');
    return (
      <TouchableOpacity onPress={onPress}>
        <Text>{title}</Text>
      </TouchableOpacity>
    );
  };
});

describe('Componente SelecaoMaxJogadores', () => {

  beforeEach(() => mockPush.mockClear());

  it('Deve renderizar o título traduzido e botões', () => {
    const { getByText } = render(<SelecaoMaxJogadores />);

    expect(getByText('Escolha o esporte')).toBeTruthy();
    expect(getByText('Futebol')).toBeTruthy();
    expect(getByText('Vôlei')).toBeTruthy();
    expect(getByText('Basquete')).toBeTruthy();
  });

  it('Ao clicar em Futebol deve navegar com max 11 jogadores', () => {
    const { getByText } = render(<SelecaoMaxJogadores />);
    fireEvent.press(getByText('Futebol'));

    expect(mockPush).toHaveBeenCalledWith({
      pathname: '/sorteio',
      params: { maxPorTime: 11 }
    });
  });

  it('Ao clicar em Vôlei deve navegar com max 6 jogadores', () => {
    const { getByText } = render(<SelecaoMaxJogadores />);
    fireEvent.press(getByText('Vôlei'));

    expect(mockPush).toHaveBeenCalledWith({
      pathname: '/sorteio',
      params: { maxPorTime: 6 }
    });
  });

  it('Ao clicar em Basquete deve navegar com max 5 jogadores', () => {
    const { getByText } = render(<SelecaoMaxJogadores />);
    fireEvent.press(getByText('Basquete'));

    expect(mockPush).toHaveBeenCalledWith({
      pathname: '/sorteio',
      params: { maxPorTime: 5 }
    });
  });

});
