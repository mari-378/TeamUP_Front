import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const Times = ({ times }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {times.map((time, index) => (
        <View key={index} style={styles.timeCard}>
          <Text style={styles.timeTitle}> {index + 1}</Text>
          {time.map((jogador, jIndex) => (
            <View key={jIndex} style={styles.jogador}>
              <Text style={styles.jogadorText}>
                {jogador.nome}  {jogador.habilidade}{" "}
                <MaterialIcons name="star" size={16} color="yellow" /> { /*mudar aqui depois */}
              </Text>
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
  },
  timeCard: {
    backgroundColor: "rgb(199, 253, 6)", 
    padding: 10,
    borderRadius: 12,
    marginBottom: 15,
    minWidth: 120,
  },
  timeTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  jogador: {
    backgroundColor: "rgb(0, 125, 240)", 
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginBottom: 5,
  },
  jogadorText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Times;
