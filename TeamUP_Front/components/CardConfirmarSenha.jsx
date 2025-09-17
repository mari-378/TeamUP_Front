import React, { useState } from 'react';
import { TextInput, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import "@/i18n";
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '@/validation/schemas';
import { useTheme } from '../contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

export default function CardConfirmarSenha() {
    const { temaAtual } = useTheme();
    const { t } = useTranslation();
    const schema = loginSchema(t);
    const { control, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });
    const [mostrarSenha, setMostrarSenha] = useState(false);

    return (
        <Controller
            control={control}
            name='confirmarSenha'
            render={({ field: { onChange, value } }) => (
                <>
                    <View style={[styles.inputContainer, { backgroundColor: temaAtual.caixaTexto }]}>
                        <View style={styles.elements}>
                            <Ionicons
                                name='lock-closed-outline'
                                size={18}
                                color={temaAtual.icones}
                                style={styles.icon}   
                            />
                            <TextInput
                                style={[styles.input, { outline: 'none', color: temaAtual.textoAzul }]}
                                placeholder={t('signup.confirmPassword')}
                                value={value}
                                onChangeText={onChange}
                                secureTextEntry={!mostrarSenha}
                            />
                        </View>
                        <TouchableOpacity
                            onPress={() => setMostrarSenha(!mostrarSenha)}
                        >
                            <Ionicons
                                name={mostrarSenha ? 'eye-outline' : 'eye-off-outline' }
                                size={18}
                                color={temaAtual.icones} 
                            />
                        </TouchableOpacity>
                    </View>
                    {errors.senha && <Text style={[styles.error, { color: temaAtual.error }]}>{errors.senha.message}</Text>}
                </>
            )}
        />
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: 'transparent',
        padding: 10,
        marginBottom: 20,
        borderRadius: 50,
        height: 40,
    },
    icon: {
        marginRight: 6,
    },
    elements: {
        flexDirection: 'row',
        maxWidth: 40,
    },
    error: {
        marginBottom: 10,
    },
})