import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';
import Botao from './Botao';
import { Regras } from './Regras';

export default function SelecaoEsporte() {
    const { t } = useTranslation();
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Botao
                title={t('sports.football')} 
                onPress={() => {
                    const esporte = 'football';
                    Regras(esporte);
                    router.push('/regras')}}
            />
            <Botao
                title={t('sports.volleyball')} 
                onPress={() => {
                    const esporte = 'volleyball';
                    Regras(esporte);
                    router.push('/regras')}}
            />
            <Botao
                title={t('sports.basketball')} 
                onPress={() => {
                    const esporte = 'basketball';
                    Regras(esporte);
                    router.push('/regras')}}
            />

        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        gap: 20,
    }
});