import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { useTheme } from '../contexts/ThemeContext';

const esportes = [
  { id: "1", nome: "Basquete", icone: <FontAwesome5 name="basketball-ball" size={18} color="black" /> },
  { id: "2", nome: "Futebol", icone: <FontAwesome5 name="futbol" size={18} color="black" /> },
  { id: "3", nome: "Futsal", icone: <FontAwesome5 name="futbol" size={18} color="black" /> },
  { id: "4", nome: "Volei de Areia", icone: <FontAwesome5 name="volleyball-ball" size={18} color="black" /> },
  { id: "5", nome: "Volei de Quadra", icone: <FontAwesome5 name="volleyball-ball" size={18} color="black" /> },
];

export default function Esporte() {
  const { temaAtual } = useTheme();
  const [aberto, setAberto] = useState(false);
  const [selecionado, setSelecionado] = useState(esportes[0]);

  const selecionarEsporte = (item) => {
    setSelecionado(item);
    setAberto(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Esporte</Text>

      {/* Botão principal */}
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setAberto(!aberto)}
      >
        <View style={styles.option}>
          {selecionado.icone}
          <Text style={styles.optionText}>{selecionado.nome}</Text>
        </View>
        <MaterialIcons
          name={aberto ? "keyboard-arrow-up" : "keyboard-arrow-down"}
          size={22}
          color="black"
        />
      </TouchableOpacity>

      {/* Lista de opções */}
      {aberto && (
        <View style={styles.dropdown}>
          <FlatList
            data={esportes}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.option}
                onPress={() => selecionarEsporte(item)}
              >
                {item.icone}
                <Text style={styles.optionText}>{item.nome}</Text>
                {item.id === selecionado.id && (
                  <MaterialIcons name="check" size={18} color="black" style={{ marginLeft: "auto" }} />
                )}
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "500",
    color: "#000",
  },
  dropdownButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#c9fd06", 
    padding: 12,
    borderRadius: 8,
  },
  dropdown: {
    marginTop: 5,
    backgroundColor: "rgb(199, 253, 6)",
    borderRadius: 8,
    paddingVertical: 5,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  optionText: {
    marginLeft: 8,
    fontSize: 15,
    color: "#000",
  },
});