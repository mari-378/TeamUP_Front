import { View } from "react-native";
// import PaginaDeLogin from "../pages/PaginaDeLogin";
// import PaginaDeCadastro from "../pages/PaginaDeCadastro";
import BotaoAlterarPlacar from "../components/BotaoAlterarPlacar";

export default function Index() {
  return (
    <View style={{ flex: 1 }}>
      {/* <PaginaDeLogin /> */}
      {/* <PaginaDeCadastro /> */}
      <BotaoAlterarPlacar />
    </View>
  );
}