import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "../contexts/ThemeContext";

export default function Habilidade({ nivelInicial = 0, onChange, label = "Nível de Habilidade" }) {
  const [nivel, setNivel] = useState(nivelInicial);
  const { temaAtual } = useTheme();

  useEffect(() => {
    setNivel(nivelInicial);
  }, [nivelInicial]);

  const atualizar = (num) => {
    setNivel(num);
    if (onChange) onChange(num);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.starsRow}>
        {[1, 2, 3, 4, 5].map((num) => (
          <TouchableOpacity key={num} onPress={() => atualizar(num)}>
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
    marginVertical: 10,
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
