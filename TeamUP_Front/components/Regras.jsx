import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import { Cores } from '../constants/Cores';

export default function Regras() {
    const { temaAtual } = useTheme();
    const { t } = useTranslation();

    return (
        <View style={styles.container}>
            <Text style={[styles.text, { color: temaAtual.texto }]}>{t('navbar.aboutUs')}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Cores.light.fundo,
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
    }
});