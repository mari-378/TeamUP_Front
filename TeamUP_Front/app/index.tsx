import { View } from "react-native";
// import PaginaDeLogin from "../pages/PaginaDeLogin";
// import PaginaDeCadastro from "../pages/PaginaDeCadastro";
// import BotaoAlterarPlacar from "../components/BotaoAlterarPlacar";
import PaginaDePlacar from "../pages/PaginaDePlacar";

export default function Index() {
  return (
    <View style={{ flex: 1 }}>
      {/* <PaginaDeLogin /> */}
      {/* <PaginaDeCadastro /> */}
      <PaginaDePlacar />
    </View>
  );
}