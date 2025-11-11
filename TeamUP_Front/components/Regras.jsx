import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';

export default function Regras({ esporte }) {
    const { temaAtual } = useTheme();
    const { t } = useTranslation();

    return (
        <View style={[styles.container, { backgroundColor: temaAtual.fundo }]}>
            <View style={[styles.cardText, { backgroundColor: temaAtual.caixaTexto }]}>
                <Text style={[styles.text, { color: temaAtual.textoAzul }]}>{t(`${esporte}.firstRule`)}</Text>
            </View>

            <View style={[styles.cardText, { backgroundColor: temaAtual.caixaTexto }]}>
                <Text style={[styles.text, { color: temaAtual.textoAzul }]}>{t(`${esporte}.secondRule`)}</Text>
            </View>

            <View style={[styles.cardText, { backgroundColor: temaAtual.caixaTexto }]}>
                <Text style={[styles.text, { color: temaAtual.textoAzul }]}>{t(`${esporte}.thirdRule`)}</Text>
            </View>

            <View style={[styles.cardText, { backgroundColor: temaAtual.caixaTexto }]}>
                <Text style={[styles.text, { color: temaAtual.textoAzul }]}>{t(`${esporte}.fourthRule`)}</Text>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        gap: 20,
    },
    cardText: {
        borderRadius: 10,
        height: 50,
        justifyContent: 'center',
        padding: 10,
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
    }
});