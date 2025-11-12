import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import MudarTema from '@/components/MudarTema';
import MudarLingua from '@/components/MudarLingua';
import Cronometro from '../components/Cronometro';
import BotaoAlterarPlacar from '../components/BotaoAlterarPlacar';
import Botao from '../components/Botao';
import PlacarSalvo from '../components/PlacarSalvo';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

export default function PaginaCronometroPlacar() {
  const { temaAtual } = useTheme();
  const { t } = useTranslation();
  const { width } = useWindowDimensions();
  const isSmallScreen = width < 700;

  const [placar, setPlacar] = useState({ timeA: 0, timeB: 0 });
  const [periodo, setPeriodo] = useState(1);
  const [placaresSalvos, setPlacaresSalvos] = useState([]);

  const salvarPlacar = () => {
    if (placar.timeA === 0 && placar.timeB === 0) return;
    setPlacaresSalvos(prev => [
      ...prev,
      { periodo, pontuacao: `${placar.timeA} x ${placar.timeB}` },
    ]);
    setPeriodo(p => p + 1);
  };

  const resetarPlacar = () => {
    setPlacar({ timeA: 0, timeB: 0 });
    setPeriodo(1);
    setPlacaresSalvos([]);
  };

  return (
    <ScrollView
      style={[styles.root, { backgroundColor: temaAtual.fundo }]}
      contentContainerStyle={styles.scrollContent}
    >
      <NavBar />
      <View style={styles.header}>
        <Text style={[styles.titulo, { color: temaAtual.texto }]}>
          {t('featureOptions.timerAndScore')}
        </Text>
        <View style={styles.botoesTroca}>
          <MudarLingua />
          <MudarTema />
        </View>
      </View>

      <View
        style={[
          styles.body,
          { flexDirection: isSmallScreen ? 'column' : 'row' },
        ]}
      >
        <View style={[styles.coluna, styles.colunaCronometro]}>
          <Text style={[styles.subtitulo, { color: temaAtual.texto }]}>
            {t('featureOptions.timer')}
          </Text>
          <Cronometro />
        </View>

        {!isSmallScreen && (
          <View
            style={[
              styles.divider,
              { backgroundColor: temaAtual.texto + '33' },
            ]}
          />
        )}

        <View style={[styles.coluna, styles.colunaPlacar]}>
          <Text style={[styles.subtitulo, { color: temaAtual.texto }]}>
            {t('score.score')}
          </Text>

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

          <Botao title={t('score.save')} onPress={salvarPlacar} style={styles.botao} />

          <Text style={[styles.resultado, { color: temaAtual.texto }]}>
            {t('score.result')}
          </Text>

          {placaresSalvos.length === 0 ? (
            <Text style={[styles.semResultados, { color: temaAtual.texto }]}>
              — {t('score.noSaved') || 'Nenhum placar salvo'} —
            </Text>
          ) : (
            placaresSalvos.map((p, index) => (
              <PlacarSalvo
                key={index}
                periodo={p.periodo}
                pontuacao={p.pontuacao}
              />
            ))
          )}

          <Botao title={t('score.reset')} onPress={resetarPlacar} style={styles.botao} />
        </View>
      </View>
      <Footer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  titulo: {
    fontSize: 26,
  },
  botoesTroca: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  body: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  coluna: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
  },
  colunaCronometro: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  colunaPlacar: {
    justifyContent: 'flex-start',
  },
  divider: {
    width: 2,
    marginHorizontal: 16,
    borderRadius: 2,
  },
  subtitulo: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 12,
  },
  containerPlacar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
  },
  resultado: {
    fontSize: 18,
    paddingTop: 8,
    paddingBottom: 8,
  },
  semResultados: {
    textAlign: 'center',
    opacity: 0.7,
    fontStyle: 'italic',
    marginVertical: 6,
  },
  botao: {
    alignSelf: 'center',
    marginVertical: 6,
  },
});
