import { View, StyleSheet, Text } from "react-native";
import Cadastro from "../components/Cadastro";
import MudarLingua from "../components/MudarLingua";
// import { Feather } from "@expo/vector-icons";
import { useTranslation } from 'react-i18next';
import MudarTema from "@/components/MudarTema";
import { useTheme } from '../contexts/ThemeContext';

export default function PaginaDeCadastro() {
  const { temaAtual } = useTheme();
  const { t } = useTranslation();

  return (
    <View style={[styles.container, { backgroundColor: temaAtual.fundo }]}>
      {/* <View style={styles.head}>
        <Feather 
          name="arrow-left"
          size={24}
          color={Cores.light.texto}
        />
        <Image 
          source={require('../assets/images/logo.png')}
          style={styles.logoImg}
          resizeMode="contain"
        />
      </View> */}

      <View style={styles.mid}>
        <Text style={[styles.text, { color: temaAtual.texto }]}>{t('signup.signup')}</Text>
        <View style={styles.botao}>
          <MudarTema />
          <MudarLingua />
        </View>
        
      </View>

      <View style={styles.tail}>
        <Cadastro />
      </View>

      <>
        <Text style={[styles.textoFooter, { color: temaAtual.texto }]}>{t('signup.message')}</Text>
      </>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  head: {
    width: '100%',
    height: '10%',
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: '30%',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  mid: {
    flexDirection: 'row',
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    paddingHorizontal: 30,
    gap: '30%',
  },
  botao: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  logoImg: {
    width: '50%',
    maxWidth: 120,
    aspectRatio: 1,
    height: undefined,
  },
  text: {
    marginBottom: 20,
    marginTop: 20,
    fontSize: 20,
  },
  tail: {
    flex: 6,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  textoFooter: {
    marginBottom: 40,
    fontSize: 10,
  },
});