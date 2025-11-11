import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../contexts/ThemeContext";

export default function Jogadores({ jogadores, removerJogador }) {
  const { temaAtual } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Jogadores ({jogadores.length}):</Text>

      <View style={styles.playersContainer}>
        {jogadores.map((jogador, index) => (
          <View key={index} style={styles.playerBadge}>
            <Text style={styles.playerText}>{jogador}</Text>
            <TouchableOpacity onPress={() => removerJogador(index)}>
              <MaterialIcons name="delete" size={18} color="white" />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  label: {
    fontSize: 14,
    marginBottom: 10,
    color: "gray",
  },
  playersContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  playerBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "blue",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 4,
  },
  playerText: {
    color: "white",
    marginRight: 6,
    fontSize: 14,
  },
});
