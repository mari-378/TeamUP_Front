import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import '@/i18n';
import { useTranslation } from 'react-i18next';
import { Controller } from 'react-hook-form';
import { Cores } from '../constants/Cores';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';

export default function CardGenero({ control, errors }) {
    const { t } = useTranslation();
    const { temaAtual } = useTheme();

    const opcoes = [
        { label: t('signup.female'), value: 'F'},
        { label: t('signup.male'), value: 'M'},
        { label: t('signup.other'), value: 'Outro'},
    ];

    return (
        <View style={styles.container}>
            <Controller
                control={control}
                name='gender'
                defaultValue=''
                render={({ field }) => {
                    const { value, onChange } = field;

                    return (
                        <>
                            <View style={styles.linha}>
                                {opcoes.map(opcao => {
                                    const selecionado = value === opcao.value;
                                    return (
                                        <TouchableOpacity
                                            key={opcao.value}
                                            style={[styles.cartao, { borderColor: temaAtual.textoSecundario }]}
                                            onPress={() => {
                                                console.log('genero', opcao.value)
                                                onChange(opcao.value);
                                            }}
                                            testID={`input-genero-${opcao.value}`}
                                            data-testid={`input-genero-${opcao.value}`} 
                                        >
                                            <View style={styles.conteudo}>
                                                <Text style={[styles.texto, { color: temaAtual.textoSecundario }]}>{opcao.label}</Text>
                                                <View style={[styles.circulo, { borderColor: temaAtual.textoSecundario }]}>
                                                    {selecionado && (
                                                        <Feather
                                                            name='check'
                                                            size={14}
                                                            color={Cores.light.botao}
                                                        />
                                                    )}
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>

                            {errors.gender && (
                                <Text style={[styles.error, { color: temaAtual.erro }]}>{t(errors.gender.message)}</Text>
                            )}
                        </>
                    );
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        marginBottom: 25,
    },
    linha: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cartao: {
        flex: 1,
        marginHorizontal: 5,
        paddingVertical: 5,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    conteudo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
        width: '100%',
    },
    circulo: {
        width: 15,
        height: 15,
        borderRadius: 10,
        borderWidth: 1,
        alignItems:'center',
        justifyContent: 'center',
        marginRight: 8,
    },
    error: {
        marginTop: 5,
    }
})