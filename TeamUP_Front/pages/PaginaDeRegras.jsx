import React from "react";
import { View, StyleSheet } from 'react-native';
import { useLocalSearchParams } from "expo-router";
import Regras from '../components/Regras';

export default function PaginaRegras() {
    const { esporte } = useLocalSearchParams();

    return (
        <View style={styles.container}>
            <Regras esporte={esporte} />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});