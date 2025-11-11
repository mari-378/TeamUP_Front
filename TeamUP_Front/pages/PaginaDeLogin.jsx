import { View, StyleSheet, Image } from "react-native";
import Login from "../components/Login";
import MudarLingua from "../components/MudarLingua";
import MudarTema from "../components/MudarTema";
import { useTheme } from '../contexts/ThemeContext';

export default function PaginaDeLogin() {
  const { temaAtual } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: temaAtual.fundo }]}>
      <View style={styles.botoes}>
        <MudarLingua />
        <MudarTema />
      </View>
      <View style={styles.logo}>
        <Image 
          source={require('../assets/images/logo.png')} 
          style={styles.logoImg} 
          resizeMode="contain" 
        />
      </View>
      <View style={styles.login}>
        <Login />
      </View>
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
  botoes: {
    position: 'absolute',
    top: 40,
    right: 40,
    zIndex: 10,
  },
  logo: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
  },
  logoImg: {
    width: '100%',
    height: '100%',
  },
  login: {
    flex: 6,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  }
});