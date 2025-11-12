import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import CardConfirmarSenha from '../components/CardConfirmarSenha';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';

const mockTema = {
    caixaTexto: '#EFEFEF', 
    textoAzul: '#007AFF', 
    icones: '#555555',
    error: '#FF3B30',
};
const mockedUseTheme = useTheme;
jest.mock('../contexts/ThemeContext', () => ({
  useTheme: jest.fn(),
}));

const mockedUseTranslation = useTranslation;
jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(() => ({
    t: (key) => key, 
    i18n: { changeLanguage: jest.fn() },
  })),
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
}));
jest.mock('../i18n', () => ({}));

jest.mock('react-hook-form', () => {
    const ActualRHF = jest.requireActual('react-hook-form');
    return {
        ...ActualRHF,
        Controller: ({ control, name, defaultValue, render }) => {
            return render({
                field: {
                    onChange: jest.fn(),
                    onBlur: jest.fn(),
                    value: defaultValue || '',
                    name: name,
                    ref: jest.fn(),
                },
                fieldState: {
                    invalid: false,
                    isDirty: false,
                    isTouched: false,
                    error: undefined,
                },
                formState: {
                    isSubmitted: false,
                    errors: {},
                    dirtyFields: {},
                    touchedFields: {},
                    isDirty: false,
                    isValid: true,
                },
            });
        },
    };
});

jest.mock('@expo/vector-icons', () => ({
  Ionicons: ({ name, ...props }) => <mock-Ionicons accessibilityHint={name} {...props} />,
}));

describe('CardConfirmarSenha', () => {
    let controlMock;

    beforeEach(() => {
        jest.clearAllMocks();
        mockedUseTheme.mockReturnValue({ temaAtual: mockTema });
        
        controlMock = {
            getFieldState: jest.fn(),
            _get        : jest.fn(),
            _updateNames: jest.fn(),
            _names      : jest.fn(),
            getValues   : jest.fn(() => ({})),
            register    : jest.fn(() => ({ onChange: jest.fn() })),
            unregister  : jest.fn(),
            control: true,
        };
    });
    
    const renderComponent = (errors = {}) => {
        return render(
            <CardConfirmarSenha 
                control={controlMock} 
                errors={errors} 
            />
        );
    };

    test('renderiza o TextInput com o placeholder correto e estilos de tema', () => {
        renderComponent();
        
        const input = screen.getByPlaceholderText('signup.confirmPassword');
        expect(input).toBeTruthy();

        expect(input.props.style).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ color: mockTema.textoAzul }),
            ])
        );
    });

    test('exibe a mensagem de erro quando presente nas props', () => {
        const errorProps = {
            confirmPassword: { message: 'A confirmação é obrigatória', type: 'required' },
        };
        
        renderComponent(errorProps);
        
        const errorMessage = screen.getByText('A confirmação é obrigatória');
        expect(errorMessage).toBeTruthy();
        
        expect(errorMessage.props.style).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ color: mockTema.error }),
            ])
        );
    });
    
    test('chama o hook onChange do RHF quando o texto muda', () => {
        const { getByPlaceholderText } = renderComponent();
        const input = getByPlaceholderText('signup.confirmPassword');
        
        expect(input.props.onChangeText).toBeDefined();
    });


    test('inicia com a senha oculta (secureTextEntry=true)', () => {
        const { getByPlaceholderText } = renderComponent();
        const input = getByPlaceholderText('signup.confirmPassword');
        
        expect(input.props.secureTextEntry).toBe(true);
        
        expect(screen.getByAccessibilityHint('eye-off-outline')).toBeTruthy();
    });

    test('alterna o estado de secureTextEntry e o ícone ao pressionar o botão', () => {
        const { getByPlaceholderText } = renderComponent();
        const input = getByPlaceholderText('signup.confirmPassword');
        
        const toggleButton = screen.getByAccessibilityHint('eye-off-outline').parent;
        
        fireEvent.press(toggleButton); 
        
        expect(input.props.secureTextEntry).toBe(false);
        expect(screen.getByAccessibilityHint('eye-outline')).toBeTruthy(); 
        
        fireEvent.press(toggleButton);
        
        expect(input.props.secureTextEntry).toBe(true);
        expect(screen.getByAccessibilityHint('eye-off-outline')).toBeTruthy(); 
    });
});