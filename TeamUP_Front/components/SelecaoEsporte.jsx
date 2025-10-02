import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';
import Botao from './Botao';

export default function SelecaoEsporte() {
    const { t } = useTranslation();
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Botao
                title={t('sports.football')} 
                onPress={() => {
                    router.push({ pathname: '/regras', params: { esporte: 'football' }})}}
            />
            <Botao
                title={t('sports.volleyball')} 
                onPress={() => {
                    router.push({ pathname: '/regras', params: { esporte: 'volleyball' }})}}
            />
            <Botao
                title={t('sports.basketball')} 
                onPress={() => {
                    router.push({ pathname: '/regras', params: { esporte: 'basketball' }})}}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        gap: 20,
    }
});