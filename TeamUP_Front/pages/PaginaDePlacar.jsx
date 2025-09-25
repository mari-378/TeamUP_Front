import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import '@/i18n';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet } from 'react-native';
import BotaoAlterarPlacar from '../components/BotaoAlterarPlacar';
import Botao from '../components/Botao';

export default function PaginaDePlacar() {
    const { temaAtual } = useTheme();
    const { t } = useTranslation();

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>{t('score.score')}</Text>
            <View style={styles.containerPlacar}>
                <BotaoAlterarPlacar />
                <BotaoAlterarPlacar />
            </View>
            <Botao 
                title={"Salvar placar"}
                // onPress={}
                style={styles.botao}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        gap: 15,
    },
    titulo: {
        fontSize: 30,
        paddingLeft: 30,
    },
    containerPlacar: {
        flexDirection: 'row',
    },
    botao: {
        
    }
});