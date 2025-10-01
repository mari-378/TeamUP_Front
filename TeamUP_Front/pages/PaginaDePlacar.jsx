import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import '@/i18n';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet } from 'react-native';
import BotaoAlterarPlacar from '../components/BotaoAlterarPlacar';
import Botao from '../components/Botao';
import PlacarSalvo from '../components/PlacarSalvo';
import MudarTema from '@/components/MudarTema';

export default function PaginaDePlacar() {
    const { temaAtual } = useTheme();
    const { t } = useTranslation();

    return (
        <View style={[styles.container, { backgroundColor: temaAtual.fundo }]}>
            <View style={styles.head}>
                <Text style={[styles.titulo, { color: temaAtual.texto }]}>{t('score.score')}</Text>
                <MudarTema />
            </View>
            
            <View style={styles.containerPlacar}>
                <BotaoAlterarPlacar />
                <BotaoAlterarPlacar />
            </View>
            <Botao 
                title={t('score.save')}
                // onPress={}
                style={[styles.botao]}
            />
            <Text style={styles.resultado}>{t('score.result')}</Text>

            <PlacarSalvo />
            <PlacarSalvo />
            
            <Botao
                title={t('score.reset')}
                style={styles.botao}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        gap: 20,
    },
    head: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    titulo: {
        fontSize: 30,
        paddingLeft: 30,
    },
    containerPlacar: {
        flexDirection: 'row',
    },
    resultado: {
        fontSize: 20,
        paddingLeft: 30,
        paddingTop: 20,
    }
});