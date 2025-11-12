import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { MaterialIcons, Ionicons, FontAwesome5 } from "@expo/vector-icons";

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(false);

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require("../assets/images/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Menu */}
      <View style={styles.menu}>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Nós</Text>
        </TouchableOpacity>

        {/* Dropdown */}
        <View>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => setOpenDropdown(!openDropdown)}
          >
            <MaterialIcons name="category" size={24} color="black" />
            <Text style={styles.menuText}>Funcionalidades</Text>
            <MaterialIcons
              name={openDropdown ? "keyboard-arrow-up" : "keyboard-arrow-down"}
              size={20}
              color="black"
            />
          </TouchableOpacity>

          {openDropdown && (
            <View style={styles.dropdown}>
              <TouchableOpacity style={styles.dropdownItem}>
                <Ionicons name="dice-outline" size={20} color="black" />
                <Text style={styles.dropdownText}>Sorteio</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.dropdownItem}>
                <MaterialIcons name="timer" size={20} color="black" />
                <Text style={styles.dropdownText}>Placar + Cronômetro</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.dropdownItem}>
                <FontAwesome5 name="hand-paper" size={20} color="black" />
                <Text style={styles.dropdownText}>Regras</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      {/* Cadastro */}
      <TouchableOpacity style={styles.cadastro}>
        <Text style={styles.cadastroText}>cadastra-se</Text>
        <MaterialIcons name="login" size={20} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: "#dfff00",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 50,
  },
  logo: {
    width: 50,
    height: 50,
  },
  menu: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
  },
  menuText: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: "bold",
  },
  cadastro: {
    flexDirection: "row",
    alignItems: "center",
  },
  cadastroText: {
    marginRight: 5,
    fontSize: 16,
    fontWeight: "bold",
  },
  dropdown: {
    position: "absolute",
    top: 40,
    left: 0,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 10,
    elevation: 5, // sombra no Android
    shadowColor: "#000", // sombra no iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
  },
  dropdownText: {
    marginLeft: 8,
    fontSize: 14,
  },
});