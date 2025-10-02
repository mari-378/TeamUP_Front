import React from "react";
import { ScrollView, StyleSheet } from 'react-native';
import { useLocalSearchParams } from "expo-router";
import Regras from '../components/Regras';

export default function PaginaRegras() {
    const { esporte } = useLocalSearchParams();

    return (
        <ScrollView style={styles.container}>
            <Regras esporte={esporte} />
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});