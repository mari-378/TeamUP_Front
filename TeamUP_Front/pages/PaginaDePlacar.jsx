import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import '@/i18n';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet } from 'react-native';
import BotaoAlterarPlacar from '../components/BotaoAlterarPlacar';

export default function PaginaDePlacar() {
    const { temaAtual } = useTheme();
    const { t } = useTranslation();

    return (
        <View style={styles.container}>
            <BotaoAlterarPlacar />
            <BotaoAlterarPlacar />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
});