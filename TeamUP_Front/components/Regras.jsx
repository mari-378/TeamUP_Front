import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';

export default function Regras({ esporte }) {
    const { temaAtual } = useTheme();
    const { t } = useTranslation();

    return (
        <View style={[styles.container, { backgroundColor: temaAtual.fundo }]}>
            <Text style={[styles.text, { color: temaAtual.texto }]}>{t(`${esporte}.firstRule`)}</Text>
            <Text style={[styles.text, { color: temaAtual.texto }]}>{t(`${esporte}.secondRule`)}</Text>
            <Text style={[styles.text, { color: temaAtual.texto }]}>{t(`${esporte}.thirdRule`)}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        textAlign: 'center',
    }
});