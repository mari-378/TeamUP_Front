import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function Footer() {
  return (
    <View style={styles.container}>
      {/* Esquerda: Logo e direitos autorais */}
      <View style={styles.left}>
        <Image
          source={require("../assets/images/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.copy}>Copyright © 2025 - TeamUP</Text>
      </View>

      {/* Direita: Ícones sociais e botões de loja */}
      <View style={styles.right}>
        {/* Redes sociais */}
        <View style={styles.socials}>
          <TouchableOpacity>
            <FontAwesome name="facebook" size={20} color="black" />
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesome name="instagram" size={20} color="black" />
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesome name="globe" size={20} color="black" />
          </TouchableOpacity>
        </View>

        {/* Botões de app stores */}
        <View style={styles.stores}>
          <Image
            source={require("../assets/images/apple.png")}
            style={styles.storeBtn}
            resizeMode="contain"
          />
          <Image
            source={require("../assets/images/google.png")}
            style={styles.storeBtn}
            resizeMode="contain"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 80,
    backgroundColor: "#f8f6ed",
    borderTopWidth: 3,
    borderTopColor: "blue",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 8,
  },
  copy: {
    fontSize: 12,
    color: "#333",
  },
  right: {
    flexDirection: "row",
    alignItems: "center",
  },
  socials: {
    flexDirection: "row",
    marginRight: 15,
    gap: 10,
  },
  stores: {
    flexDirection: "row",
    gap: 10,
  },
  storeBtn: {
    width: 100,
    height: 35,
  },
});