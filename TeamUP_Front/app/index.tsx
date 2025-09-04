import { View, StyleSheet } from "react-native";
import Login from "../components/Login";
import { Cores } from "@/constants/Cores";

export default function Index() {
  return (
    <View style={styles.container}>
      <Login />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Cores.branco,
  },
});