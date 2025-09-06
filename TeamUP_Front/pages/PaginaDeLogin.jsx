import { View, StyleSheet, Image, Dimensions } from "react-native";
import Login from "../components/Login";
import MudarLingua from "../components/MudarLingua";
import { Cores } from "@/constants/Cores";

const { width, height } = Dimensions.get('window');

export default function PaginaDeLogin() {
  return (
    <View style={styles.container}>
      <MudarLingua style={styles.mudarLingua} />
      <Image source={require('../assets/images/logo.png')} style={styles.logo} resizeMode="contain" />
      <Login />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flex: 1,
    backgroundColor: Cores.branco,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  logo: {
    width: width * 0.5,
    aspectRatio: 1,
    maxHeight: height * 0.3,
    marginBottom: 50,
  },
  mudarLingua: {
    position: 'absolute',
  },
});