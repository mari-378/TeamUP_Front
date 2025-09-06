import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Cores } from '../constants/Cores';

export default function MudarLingua() {
    const { i18n } = useTranslation();

    return (
        <TouchableOpacity onPress={() => i18n.changeLanguage(i18n.language === 'pt-BR' ? 'en-US' : 'pt-BR')} style={styles.button}>
            <Text style={styles.buttonText}>{i18n.language === 'pt-BR' ? 'EN' : 'PT'}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: Cores.verde,
        padding: 5,
        borderRadius: 5,
        alignSelf: 'flex-end',
    },
    buttonText: {
        color: Cores.azul,
        fontSize: 12,
    },
});
