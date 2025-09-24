import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { Cores } from '../constants/Cores';

export default function CardPlacar( {pontuacao} ) {
    const { temaAtual } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: temaAtual.caixaTexto }]}>
            <Text style={styles.textoContainer}>{pontuacao}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        width: '20%',
        maxWidth: 350,
        height: '15%',
        maxHeight: '200',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },
    textoContainer: {
        fontSize: 40,
        fontWeight: 'bold',
        color: Cores.light.texto,
    },
});