import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import CardPlacar from './CardPlacar';
import "@/i18n";
import { useTranslation } from 'react-i18next';

export default function BotaoAlterarPlacar() {
    const [pontos, setPontos] = useState(0);
    const { temaAtual } = useTheme();
    const { t } = useTranslation();

    function aumentarPontos(valor) {
        setPontos(pontos + valor);
    }

    function diminuirPontos(valor) {
        if (pontos > 0 && valor <= pontos) {
            setPontos(pontos - valor);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.cardPlacar}>
                <CardPlacar time={t('score.name')} pontuacao={pontos} />
            </View>
            
            <View style={styles.containerBotoes}>
                <TouchableOpacity
                    onPress={() => aumentarPontos(1)} 
                    style={[styles.botao, { backgroundColor: temaAtual.botao }]}
                >
                    <Text style={[styles.botaoText, { color: temaAtual.fundo }]}>+1</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => aumentarPontos(2)} 
                    style={[styles.botao, { backgroundColor: temaAtual.botao }]}
                >
                    <Text style={[styles.botaoText, { color: temaAtual.fundo }]}>+2</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => aumentarPontos(3)} 
                    style={[styles.botao, { backgroundColor: temaAtual.botao }]}
                >
                    <Text style={[styles.botaoText, { color: temaAtual.fundo }]}>+3</Text>
                </TouchableOpacity>
            </View>

                <View style={styles.containerBotoes}>
                    <TouchableOpacity
                        onPress={() => diminuirPontos(1)} 
                        style={[styles.botao, { backgroundColor: temaAtual.botao }]}
                    >
                        <Text style={[styles.botaoText, { color: temaAtual.fundo }]}>-1</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => diminuirPontos(2)} 
                        style={[styles.botao, { backgroundColor: temaAtual.botao }]}
                    >
                        <Text style={[styles.botaoText, { color: temaAtual.fundo }]}>-2</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => diminuirPontos(3)} 
                        style={[styles.botao, { backgroundColor: temaAtual.botao }]}
                    >
                        <Text style={[styles.botaoText, { color: temaAtual.fundo }]}>-3</Text>
                    </TouchableOpacity>
                </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        gap: 20,
    },
    containerBotoes: {
        flexDirection: 'row',
        gap: 10,
        margin: 10,
    },
    cardPlacar: {
        width: '80%',
        maxWidth: 200,
    },
    botao: {
        width: 30,
        height: 30,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    botaoText: {
        fontWeight: 'bold',
    }
})