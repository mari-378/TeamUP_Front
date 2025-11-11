import React from "react";
import { View, StyleSheet, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';
import MudarTema from '@/components/MudarTema';
import MudarLingua from '@/components/MudarLingua';
import Cronometro from '../components/Cronometro';

export default function PaginaCronometro() {
    const { temaAtual } = useTheme();
    const { t } = useTranslation();

    return (
        <View style={[styles.container, { backgroundColor: temaAtual.fundo }]}>
            <View style={styles.head}>
                <Text style={[styles.titulo, { color: temaAtual.texto }]}>{t('featureOptions.timer')}</Text>
                    <View style={styles.botoesTroca}>
                        <MudarLingua />
                        <MudarTema />
                    </View>               
            </View>
            <Cronometro />
        </View>
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