import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SelecaoFuncionalidade from '../components/SelecaoFuncionalidade';

// Mock do router
const mockPush = jest.fn();
jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: mockPush
  })
}));

// Mock da tradução
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => {
      const traducao = {
        'featureOptions.teamDraw': 'Sortear Times',
        'featureOptions.score': 'Placar',
        'featureOptions.timer': 'Cronômetro',
        'featureOptions.rules': 'Regras',
      };
      return traducao[key] || key;
    },
  }),
}));

// Mock do componente Botao (caso ele tenha estilos/props extras)
// para garantir que o texto está acessível no teste
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

describe('Componente SelecaoFuncionalidade', () => {
  
  beforeEach(() => {
    mockPush.mockClear();
  });

  it('Deve renderizar todos os botões com tradução', () => {
    const { getByText } = render(<SelecaoFuncionalidade />);

    expect(getByText('Sortear Times')).toBeTruthy();
    expect(getByText('Placar')).toBeTruthy();
    expect(getByText('Cronômetro')).toBeTruthy();
    expect(getByText('Regras')).toBeTruthy();
  });

  it('Ao clicar em Sortear Times deve navegar para /maxjogadores', () => {
    const { getByText } = render(<SelecaoFuncionalidade />);
    fireEvent.press(getByText('Sortear Times'));
    expect(mockPush).toHaveBeenCalledWith('/maxjogadores');
  });

  it('Ao clicar em Placar deve navegar para /placar', () => {
    const { getByText } = render(<SelecaoFuncionalidade />);
    fireEvent.press(getByText('Placar'));
    expect(mockPush).toHaveBeenCalledWith('/placar');
  });

  it('Ao clicar em Cronômetro deve navegar para /cronometro', () => {
    const { getByText } = render(<SelecaoFuncionalidade />);
    fireEvent.press(getByText('Cronômetro'));
    expect(mockPush).toHaveBeenCalledWith('/cronometro');
  });

  it('Ao clicar em Regras deve navegar para /esporte', () => {
    const { getByText } = render(<SelecaoFuncionalidade />);
    fireEvent.press(getByText('Regras'));
    expect(mockPush).toHaveBeenCalledWith('/esporte');
  });

});
