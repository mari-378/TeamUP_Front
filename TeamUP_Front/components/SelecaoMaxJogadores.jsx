import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';
import Botao from './Botao';

export default function SelecaoMaxJogadores() {
  const { t } = useTranslation();
  const router = useRouter();

  // Define o máximo de jogadores por time de acordo com o esporte
  const maxPorTime = {
    football: 11,
    volleyball: 6,
    basketball: 5,
  };

  const navegarParaSorteio = (esporte) => {
    router.push({
      pathname: '/sorteio',
      params: { maxPorTime: maxPorTime[esporte] }
    });
  };

  return (
    <View style={styles.container}>
      <Botao
        title={t('sports.football')} 
        onPress={() => navegarParaSorteio('football')}
      />
      <Botao
        title={t('sports.volleyball')} 
        onPress={() => navegarParaSorteio('volleyball')}
      />
      <Botao
        title={t('sports.basketball')} 
        onPress={() => navegarParaSorteio('basketball')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 20,
  }
});
