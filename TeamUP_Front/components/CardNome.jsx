import React from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';
import "@/i18n";
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '@/validation/schemas';
import { useTheme } from '../contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

export default function CardEmail() {
    const { temaAtual } = useTheme(); 
    const { t } = useTranslation();
    const schema = loginSchema(t);
    const { control, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    return (
        <Controller
            control={control}
            name='nome'
            render={({ field: { onChange, value } }) => (
                <>
                    <View style={[styles.inputContainer, { backgroundColor: temaAtual.caixaTexto }]}>
                        <Ionicons
                            name='person-outline'
                            size={18}
                            color={temaAtual.icones}
                            style={styles.icon}   
                        />
                        <TextInput
                            style={[styles.input, { outline: 'none', color: temaAtual.textoAzul }]}
                            placeholder={t('signup.name')}
                            value={value}
                            onChangeText={onChange}
                            keyboardType='default'
                            autoCapitalize='none'
                        />
                    </View>
                    {errors.email && <Text style={[styles.error, { color: temaAtual.error }]}>{errors.email.message}</Text>}
                </>
            )}
        />
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'transparent',
        padding: 10,
        marginBottom: 20,
        borderRadius: 50,
        height: 40,
    },
    icon: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        height: 40,
        minWidth: 0,
    },
    error: {
        marginBottom: 10,
    },
})