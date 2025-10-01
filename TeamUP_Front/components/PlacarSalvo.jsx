import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

export default function PlacarSalvo({ periodo, pontuacao }) {
    const { temaAtual } = useTheme();

    return (
        <View style={styles.container}>
            <View style={[styles.periodoAtual, { backgroundColor: temaAtual.caixaTexto }]}>
                <View style={styles.circulo}>
                    <Text style={{ color: 'white' }}>{periodo}</Text>
                </View>
                <Text>Período</Text>
            </View>
            <View style={styles.pontuacao}>
                <Text style={styles.textoPontuacao}>{pontuacao}</Text>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 20,
    },
    periodoAtual: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
        height: 35,
        marginLeft: 30,
    },
    circulo: {
        backgroundColor: 'blue',
        width: 20,
        height: 20,
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    pontuacao: {
        justifyContent: 'center',
    },
    textoPontuacao: {
        fontSize: 20,
    }
})