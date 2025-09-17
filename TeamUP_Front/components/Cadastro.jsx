import React from 'react';
import { View, StyleSheet, Alert, Text } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import CardNome from './CardNome';
import CardEmail from './CardEmail';
import CardSenha from './CardSenha';
import CardConfirmarSenha from './CardConfirmarSenha';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '@/validation/schemas';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import axios from 'axios';

export default function Cadastro() {
    const { temaAtual } = useTheme();

    const { t } = useTranslation();

    const schema = loginSchema(t);

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        try {
            await axios.post('https://teamup.com/api/cadastro', {
                email: data.email,
                senha: data.senha,
                nascimento: data.nascimento,
                genero: data.genero,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        // const result = response.data; ---> talvez usar no futuro
        Alert.alert('Sucesso', 'Login realizado com sucesso!');
    } catch (error) {
        if (error.response) {
            Alert.alert('Erro', error.response.data?.message || 'Erro no servidor');
        } else if (error.request) {
            Alert.alert('Erro', 'Sem resposta do servidor');
        } else {
            Alert.alert('Erro', error.message);      
        }
    };
}

    return (
        <View style={styles.container}>
            <CardNome />
            <CardEmail />
            <CardSenha />
            <CardConfirmarSenha />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        alignSelf: 'center',
        width: '80%',
        maxWidth: 400,
    },
});