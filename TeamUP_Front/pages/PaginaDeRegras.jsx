import React from "react";
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { useLocalSearchParams } from "expo-router";
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';
import MudarTema from '@/components/MudarTema';
import MudarLingua from '@/components/MudarLingua';
import Regras from '../components/Regras';

export default function PaginaRegras() {
    const { esporte } = useLocalSearchParams();
    const { temaAtual } = useTheme();
    const { t } = useTranslation();

    return (
        <ScrollView contentContainerStyle={[styles.container, { backgroundColor: temaAtual.fundo }]}>
            <View style={styles.head}>
                <Text style={[styles.titulo, { color: temaAtual.texto }]}>{t('featureOptions.rules')}</Text>
                    <View style={styles.botoesTroca}>
                        <MudarLingua />
                        <MudarTema />
                    </View>               
            </View>
            <Regras esporte={esporte} />
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        gap: 20,
        height: '100%',
    },
    head: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    titulo: {
        fontSize: 30,
        paddingLeft: 30,
        paddingTop: 10,
    },
    botoesTroca: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});