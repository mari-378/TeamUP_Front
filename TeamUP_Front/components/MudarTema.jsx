import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

export default function MudarTema () {
    const { alternarTema, temaAtual } = useTheme();
    
    return (
        <TouchableOpacity
            style={[styles.botao, { backgroundColor: temaAtual.fundo }]}
            onPress={alternarTema}
        >
            <Text style={{ color: temaAtual.texto }}>Mudar tema</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    botao: {
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        margin: 10,
    },
});