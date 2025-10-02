import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';
import Botao from './Botao';

export default function SelecaoFuncionalidade() {
    const { t } = useTranslation();
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Botao
                title={t('featureOptions.teamDraw')} 
                onPress={() => router.push('/sorteio')}
            />
            <Botao
                title={t('featureOptions.score')} 
                onPress={() => router.push('/placar')}
            />
            <Botao
                title={t('featureOptions.timer')} 
                onPress={() => router.push('/cronometro')}
            />
            <Botao
                title={t('featureOptions.rules')} 
                onPress={() => router.push('/regras')}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        gap: 20,
    }
});