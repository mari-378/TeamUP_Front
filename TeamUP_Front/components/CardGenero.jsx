import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import '@/i18n';
import { useTranslation } from 'react-i18next';
import { Controller } from 'react-hook-form';
import { Cores } from '../constants/Cores';
import { Feather } from '@expo/vector-icons';

export default function CardGenero({ control, errors }) {
    const { t } = useTranslation();

    const opcoes = [
        { label: t('signup.female'), value: 'F'},
        { label: t('signup.male'), value: 'M'},
        { label: t('signup.other'), value: 'Outro'},
    ];

    return (
        <View style={styles.container}>
            <Controller
                control={control}
                name='genero'
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
                                            style={styles.cartao}
                                            onPress={() => onChange(opcao.value)}
                                        >
                                            <View style={styles.conteudo}>
                                                <Text style={styles.texto}>{opcao.label}</Text>
                                                <View style={styles.circulo}>
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

                            {errors.genero && (
                                <Text style={styles.error}>{t(errors.genero.message)}</Text>
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
    },
    rotulo: {
        marginBottom: 5,
        color: Cores.light.textoAzul,
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
        borderColor: Cores.light.botao,
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
        borderColor: Cores.light.botao,
        alignItems:'center',
        justifyContent: 'center',
        marginRight: 8,
    },
    texto: {
        color: Cores.light.textoAzul,
    },
    error: {
        marginTop: 5,
        color: Cores.light.erro,
    }
})