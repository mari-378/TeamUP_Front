import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import '@/i18n';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet } from 'react-native';
import BotaoAlterarPlacar from '../components/BotaoAlterarPlacar';
import Botao from '../components/Botao';
import PlacarSalvo from '../components/PlacarSalvo';
import MudarTema from '@/components/MudarTema';
import MudarLingua from '@/components/MudarLingua';

export default function PaginaDePlacar() {
    const { temaAtual } = useTheme();
    const { t } = useTranslation();

    const [placar, setPlacar] = useState({ timeA: 0, timeB: 0 });
    const [periodo, setPeriodo] = useState(1);
    const [placaresSalvos, setPlacaresSalvos] = useState([]);

    const salvarPlacar = () => {
        setPlacaresSalvos(prev => [
            ...prev,
            { periodo, pontuacao: `${placar.timeA} x ${placar.timeB}` }
        ]);
        setPeriodo(periodo + 1);
    };

    const resetarPlacar = () => {
        setPlacar({ timeA: 0, timeB: 0 });
        setPeriodo(1);
        setPlacaresSalvos([]);
    };

    return (
        <View style={[styles.container, { backgroundColor: temaAtual.fundo }]}>
            <View style={styles.head}>
                <Text style={[styles.titulo, { color: temaAtual.texto }]}>{t('score.score')}</Text>
                <View style={styles.botoesTroca}>
                    <MudarLingua />
                    <MudarTema />
                </View>
                
            </View>
            
            <View style={styles.containerPlacar}>
                <BotaoAlterarPlacar 
                    time={t('score.teamA')}
                    pontos={placar.timeA}
                    setPontos={valor => setPlacar(p => ({ ...p, timeA: valor }))}
                />
                <BotaoAlterarPlacar 
                    time={t('score.teamB')}
                    pontos={placar.timeB}
                    setPontos={valor => setPlacar(p => ({ ...p, timeB: valor }))}
                />
            </View>

            <Botao 
                title={t('score.save')}
                onPress={salvarPlacar}
                style={[styles.botao]}
            />

            <Text style={styles.resultado}>{t('score.result')}</Text>

            {placaresSalvos.map((p, index) => (
                <PlacarSalvo 
                    key={index}
                    periodo={p.periodo}
                    pontuacao={p.pontuacao}
                />
            ))}
            
            <Botao
                title={t('score.reset')}
                onPress={resetarPlacar}
                style={styles.botao}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        gap: 20,
        height: '100%',
    },
    head: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    titulo: {
        fontSize: 30,
        paddingLeft: 30,
        paddingTop: 10,
    },
    botoesTroca: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    containerPlacar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    resultado: {
        fontSize: 20,
        paddingLeft: 30,
        paddingTop: 20,
    }
});
