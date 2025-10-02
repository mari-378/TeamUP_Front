import React from "react";
import { useTheme } from "../contexts/ThemeContext";
import { useTranslation } from 'react-i18next';
import { View, StyleSheet, Text } from "react-native";
import SelecaoFuncionalidade from '../components/SelecaoFuncionalidade';

export default function PaginaDeFuncionalidades() {
    const { temaAtual } = useTheme();
    const { t } = useTranslation();

    return (
        <View style={[styles.container, { backgroundColor: temaAtual.fundo }]}>
            <Text style={[styles.texto, { color: temaAtual.texto }]}>{t('featureOptions.title')}</Text>
            <SelecaoFuncionalidade />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        gap: 50,
        height: '100%',
    },
    texto: {
        fontSize: 30,
        paddingLeft: 30,
        paddingTop: 10,
    }
});