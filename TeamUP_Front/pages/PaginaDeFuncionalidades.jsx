import React from "react";
import { useTheme } from "../contexts/ThemeContext";
import { useTranslation } from 'react-i18next';
import { View, StyleSheet, Text, Image } from "react-native";
import SelecaoFuncionalidade from '../components/SelecaoFuncionalidade';
import MudarTema from '@/components/MudarTema';
import MudarLingua from '@/components/MudarLingua';

export default function PaginaDeFuncionalidades() {
    const { temaAtual } = useTheme();
    const { t } = useTranslation();

    return (
        <View style={[styles.container, { backgroundColor: temaAtual.fundo }]}>
            <View style={styles.head}>
                <Text style={[styles.titulo, { color: temaAtual.texto }]}>{t('featureOptions.title')}</Text>
                <View style={styles.botoesTroca}>
                    <MudarLingua />
                    <MudarTema />
                </View>               
            </View>
            <View style={styles.logo}>
                <Image 
                    source={require('../assets/images/logo.png')} 
                    style={styles.logoImg} 
                    resizeMode="contain" 
                />
            </View>
            <SelecaoFuncionalidade />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        gap: 20,
        height: '100%',
        flex: 1,
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
    texto: {
        fontSize: 30,
        paddingLeft: 30,
        paddingTop: 10,
    },
    logo: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoImg: {
        width: 200,
        height: 200,
    }
});