import React from 'react';
import { View, StyleSheet, Alert, Text } from 'react-native';
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
import axios from 'axios';
import Botao from './Botao';

export default function Cadastro() {
    const { t } = useTranslation();

    const schema = signUpSchema(t);

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
        defaultValues: {
            email: '',
            password: '',
            confirmPassword: '',
            birthDate: { day: '', month: '', year: '' },
            gender: ''
        }
    });

    const onSubmit = async (data) => {
        try {
            const formattedDate = `${data.birthDate.year}-${data.birthDate.month}-${data.birthDate.day}`;

            await axios.post('http://localhost:3000/cadastro', {
                email: data.email,
                senha: data.password,
                dataDeNascimento: formattedDate,
                genero: data.gender,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });   
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
            <Text style={styles.titulo}>{t('signup.birthDate')}</Text>
            <CardDataDeNascimento control={control} errors={errors} />
            <Text style={styles.titulo}>{t('signup.gender')}</Text>
            <CardGenero control={control} errors={errors} />
            <Botao 
                title={t('signup.signup')}
                onPress={() => {
                    handleSubmit(onSubmit)();
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