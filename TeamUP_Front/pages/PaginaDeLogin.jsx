import { View, StyleSheet, Image, Dimensions } from "react-native";
import Login from "../components/Login";
import { Cores } from "@/constants/Cores";

const { width, height } = Dimensions.get('window');

export default function PaginaDeLogin() {
  return (
    <View style={styles.container}>
        <Image source={require('../assets/images/logo.png')} style={styles.logo} resizeMode="contain" />
        <Login />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Cores.branco,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: width * 0.5,
    aspectRatio: 1,
    maxHeight: height * 0.3,
    marginBottom: 50,
  },
});