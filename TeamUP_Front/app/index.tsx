import { View } from "react-native";
// import PaginaDeLogin from "../pages/PaginaDeLogin";
import PaginaDeCadastro from "../pages/PaginaDeCadastro";

export default function Index() {
  return (
    <View style={{ flex: 1 }}>
      {/* <PaginaDeLogin /> */}
      <PaginaDeCadastro />
    </View>
  );
}

