import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';

export default function MudarLingua() {
    const { temaAtual } = useTheme();
    
    const { i18n } = useTranslation();

    return (
        <TouchableOpacity 
            onPress={() => i18n.changeLanguage(i18n.language === 'pt-BR' ? 'en-US' : 'pt-BR')} 
            style={[styles.button, { backgroundColor: temaAtual.caixaTexto }]}
        >
            <Text style={[styles.buttonText, { color: temaAtual.textoAzul }]}>{i18n.language === 'pt-BR' ? 'EN' : 'PT'}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        padding: 5,
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 12,
    },
});
