import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../contexts/ThemeContext";


export default function Habilidade() {
  const [nivel, setNivel] = useState(0);
  const { temaAtual } = useTheme();
  return (
    <View style={styles.container}>
      {/* Título */}
      <Text style={styles.label}>Nível de Habilidade</Text>

      {/* Estrelas */}
      <View style={styles.starsRow}>
        {[1, 2, 3, 4, 5].map((num) => (
          <TouchableOpacity key={num} onPress={() => setNivel(num)}>
            <MaterialIcons
              name={num <= nivel ? "star" : "star-border"}
              size={28}
              color="#000"
              style={styles.star}
            />
          </TouchableOpacity>
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
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "500",
    color: "#000",
  },
  starsRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  star: {
    marginRight: 6,
  },
});
