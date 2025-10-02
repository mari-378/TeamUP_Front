import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import CardNome from './CardNome';
import CardEmail from './CardEmail';
import CardSenha from './CardSenha';
import CardConfirmarSenha from './CardConfirmarSenha';
import CardDataDeNascimento from './CardDataDeNascimento';
import CardGenero from './CardGenero';
import { yupResolver } from '@hookform/resolvers/yup';
import { signUpSchema } from '@/validation/schemas';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useTheme } from '../contexts/ThemeContext';
import { useRouter } from 'expo-router';
import axios from 'axios';
import Botao from './Botao';

export default function Cadastro() {
    const { t } = useTranslation();
    const { temaAtual } = useTheme();
    const schema = signUpSchema(t);
    const router = useRouter();

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            birthDate: { day: null, month: null, year: null },
            gender: '',
        }
    });

    const onSubmit = async (data) => {
        console.log('submit', data);

        const payload = {
            nome: data.name,
            email: data.email,
            senha: data.password,
            nascimento: data.birthDate,
            genero: data.gender,
        };
        console.log('Dados a serem enviados', payload)

        try {
            await axios.post('http://localhost:3000/cadastro', payload, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            router.push('/funcionalidades');
        } catch (error) {
            if (error.response) {
                console.log('Erro no servidor', error.response.data?.message);
            } else if (error.request) {
                console.log('Sem resposta do servidor');
            } else {
                console.log('Erro', error.message);     
            }
        };
    }

    return (
        <View style={styles.container}>
            <CardNome control={control} errors={errors}/>
            <CardEmail control={control} errors={errors} />
            <CardSenha control={control} errors={errors} />
            <CardConfirmarSenha control={control} errors={errors} />
            <Text style={[styles.titulo, { color: temaAtual.texto }]}>{t('signup.birthDate')}</Text>
            <CardDataDeNascimento control={control} errors={errors} />
            <Text style={[styles.titulo, { color: temaAtual.texto }]}>{t('signup.gender')}</Text>
            <CardGenero control={control} errors={errors} />
            <Botao 
                title={t('signup.signup')}
                onPress={() => {
                    handleSubmit((data) => onSubmit(data), (errs) => console.log('erros do form', errs)) ();
                }}
            />
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