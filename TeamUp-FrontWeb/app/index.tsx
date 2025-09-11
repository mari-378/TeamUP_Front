import React from "react";
import {Text, View, StyleSheet} from "react-native";
import Navbar from "../components/Navbar";
import {Cores} from "@/constants/Cores";


export default function Index() {
  return (
    <View
    style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
    <View style={styles.container}>
      <Navbar />
    </View>
    </View>
  );    
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Cores.branco,
  },
});
  
