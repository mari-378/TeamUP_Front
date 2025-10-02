import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../contexts/ThemeContext";

export default function NomeJogador({ onAdicionar }) {
  const { temaAtual } = useTheme();
  const [nome, setNome] = useState("");

  const adicionar = () => {
    if (nome.trim() !== "") {
      onAdicionar(nome); 
      setNome("");
    }
  };

  return (
    <View style={styles.container}>
      {/* Título */}
      <View style={styles.header}>
        <MaterialIcons name="person-add-alt" size={20} color="black" />
        <Text style={styles.title}>Adicionar Jogador</Text>
      </View>

      {/* Label */}
      <Text style={styles.label}>Nome do jogador</Text>

      {/* Input + Botão */}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome"
          placeholderTextColor="#6B6B6B"
          value={nome}
          onChangeText={setNome}
        />
        <TouchableOpacity style={styles.addButton} onPress={adicionar}>
          <MaterialIcons name="add" size={22} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 5,
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    color: "#000",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    backgroundColor: "#c9fd06",
    borderRadius: 15,
    paddingHorizontal: 12,
    height: 40,
    fontSize: 14,
    color: "#000",
  },
  addButton: {
    backgroundColor: "blue",
    marginLeft: 6,
    borderRadius: 15,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});
