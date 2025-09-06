import { View, StyleSheet, Image } from "react-native";
import Login from "../components/Login";
import MudarLingua from "../components/MudarLingua";
import { Cores } from "@/constants/Cores";

export default function PaginaDeLogin() {
  return (
    <View style={styles.container}>
      <View style={styles.mudarLingua}>
        <MudarLingua />
      </View>
      <View style={styles.logo}>
        <Image source={require('../assets/images/logo.png')} style={styles.logoImg} resizeMode="contain" />
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
    backgroundColor: Cores.branco,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  mudarLingua: {
    position: 'absolute',
    top: 30,
    right: 30,
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