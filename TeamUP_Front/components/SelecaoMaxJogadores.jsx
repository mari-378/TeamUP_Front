import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';
import { useTheme } from '../contexts/ThemeContext';
import Botao from './Botao';

export default function SelecaoMaxJogadores() {
  const { t } = useTranslation();
  const router = useRouter();
  const { temaAtual } = useTheme();

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
    <View style={[styles.container, { backgroundColor: temaAtual.fundo }]}>
      <Text style={[styles.texto, { color: temaAtual.texto }]}>{t('selectSport.title')}</Text>
      <View style={styles.logo}>
        <Image 
          source={require('../assets/images/logo.png')} 
          style={styles.logoImg} 
          resizeMode="contain" 
        />
      </View>
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
    height: '100%'
  },
  texto: {
    fontSize: 30,
    paddingLeft: 30,
    paddingTop: 10,
  },
  logo: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImg: {
    width: 200,
    height: 200,
  }
});
