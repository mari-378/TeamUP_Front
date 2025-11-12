import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import Cadastro from '../components/Cadastro';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';
import { useRouter } from 'expo-router';
import axios from 'axios';
import { TouchableOpacity, Text } from 'react-native';

jest.mock('axios');
const mockedAxios = axios;
const mockRouterPush = jest.fn();

jest.mock('expo-router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('../contexts/ThemeContext', () => ({
  useTheme: jest.fn(),
}));

jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(() => ({
    t: (key) => key,
    i18n: { changeLanguage: jest.fn() },
  })),
}));

jest.mock('@hookform/resolvers/yup', () => ({
    yupResolver: () => (values) => ({ 
        values, 
        errors: {} 
    }),
}));
jest.mock('@/validation/schemas', () => ({
    signUpSchema: jest.fn(() => ({})),
}));

const Button = ({ onPress, title, testID }) => (
    <TouchableOpacity onPress={onPress} testID={testID} accessible={true} accessibilityRole="button">
        <Text>{title}</Text>
    </TouchableOpacity>
);

jest.mock('../components/CardNome', () => (props) => <mock-CardNome {...props} testID="input-name" />);
jest.mock('../components/CardEmail', () => (props) => <mock-CardEmail {...props} testID="input-email" />);
jest.mock('../components/CardSenha', () => (props) => <mock-CardSenha {...props} testID="input-password" />);
jest.mock('../components/CardConfirmarSenha', () => (props) => <mock-CardConfirmarSenha {...props} testID="input-confirm" />);
jest.mock('../components/CardDataDeNascimento', () => (props) => <mock-CardDataDeNascimento {...props} testID="input-birth" />);
jest.mock('../components/CardGenero', () => (props) => <mock-CardGenero {...props} testID="input-gender" />);
jest.mock('../components/Botao', () => ({ title, onPress }) => (
    <Button onPress={onPress} title={title} testID="submit-button" />
));

describe('Cadastro', () => {
    const defaultTheme = { texto: '#000', botao: '#fff' };
    const API_URL = 'http://localhost:3000/cadastro';

    beforeEach(() => {
        jest.clearAllMocks();
        (useTheme).mockReturnValue({ temaAtual: defaultTheme });
        (useRouter).mockReturnValue({ push: mockRouterPush });
    });

    it('renderiza todos os componentes filhos e textos de título', () => {
        render(<Cadastro />);

        expect(screen.getByText('signup.birthDate')).toBeTruthy();
        expect(screen.getByText('signup.gender')).toBeTruthy();
        expect(screen.getByText('signup.signup')).toBeTruthy();

        expect(screen.getByTestId('input-name')).toBeTruthy();
        expect(screen.getByTestId('input-email')).toBeTruthy();
        expect(screen.getByTestId('input-password')).toBeTruthy();
        expect(screen.getByTestId('input-confirm')).toBeTruthy();
        expect(screen.getByTestId('input-birth')).toBeTruthy();
        expect(screen.getByTestId('input-gender')).toBeTruthy();
    });

    it('deve chamar axios.post com os dados default e navegar em caso de sucesso', async () => {
        mockedAxios.post.mockResolvedValueOnce({ status: 200, data: { message: 'Usuário criado' } });

        render(<Cadastro />);

        fireEvent.press(screen.getByTestId('submit-button'));
        await screen.findByText('signup.signup');
        
        const expectedPayload = {
            nome: '',
            email: '',
            senha: '',
            nascimento: { day: null, month: null, year: null },
            genero: '',
        };

        expect(mockedAxios.post).toHaveBeenCalledTimes(1);
        expect(mockedAxios.post).toHaveBeenCalledWith(
            API_URL,
            expectedPayload,
            expect.objectContaining({ headers: { 'Content-Type': 'application/json' } })
        );

        expect(mockRouterPush).toHaveBeenCalledWith('/funcionalidades');
    });

    it('não deve navegar em caso de falha da API (erro com response)', async () => {
        mockedAxios.post.mockRejectedValueOnce({
            response: {
                data: { message: 'E-mail já registrado' },
                status: 400
            }
        });

        render(<Cadastro />);
        fireEvent.press(screen.getByTestId('submit-button'));
        
        await screen.findByText('signup.signup');

        expect(mockRouterPush).not.toHaveBeenCalled();
    });

    it('não deve navegar em caso de falha da API (erro sem response/erro de rede)', async () => {
        mockedAxios.post.mockRejectedValueOnce({
            request: true,
            message: 'Network Error'
        });

        render(<Cadastro />);
        fireEvent.press(screen.getByTestId('submit-button'));
        
        await screen.findByText('signup.signup');

        expect(mockRouterPush).not.toHaveBeenCalled();
    });
});