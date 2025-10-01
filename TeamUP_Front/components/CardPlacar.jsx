import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { Cores } from '../constants/Cores';

export default function CardPlacar( {time, pontuacao} ) {
    const { temaAtual } = useTheme();

    return (
        <View style={styles.container}>
            <Text style={styles.textoTime}>{time}</Text>
            <View style={[styles.placar, { backgroundColor: temaAtual.caixaTexto }]}>
                <Text style={styles.textoContainer}>{pontuacao}</Text>
            </View>
        </View> 
    )
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        maxWidth: 200,
        maxHeight: 200,
    },
    textoTime: {
        paddingLeft: 10,
        fontSize: 16,
    },
    placar: {
        width: '100%',
        // height: '75%',
        // justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        // margin: 10,
    },
    textoContainer: {
        fontSize: 40,
        fontWeight: 'bold',
        color: Cores.light.texto,
    },
});