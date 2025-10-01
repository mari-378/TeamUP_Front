import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import CardPlacar from './CardPlacar';

export default function BotaoAlterarPlacar({ time, pontos, setPontos }) {
    const { temaAtual } = useTheme();

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
                <CardPlacar time={time} pontuacao={pontos} />
            </View>
            
            <View style={styles.containerBotoes}>
                {[1,2,3].map(num => (
                    <TouchableOpacity
                        key={`+${num}`}
                        onPress={() => aumentarPontos(num)} 
                        style={[styles.botao, { backgroundColor: temaAtual.botao }]}
                    >
                        <Text style={[styles.botaoText, { color: temaAtual.fundo }]}>+{num}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <View style={styles.containerBotoes}>
                {[1,2,3].map(num => (
                    <TouchableOpacity
                        key={`-${num}`}
                        onPress={() => diminuirPontos(num)} 
                        style={[styles.botao, { backgroundColor: temaAtual.botao }]}
                    >
                        <Text style={[styles.botaoText, { color: temaAtual.fundo }]}>-{num}</Text>
                    </TouchableOpacity>
                ))}
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
