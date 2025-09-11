import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image} from "react-native";
import { MaterialIcons} from '@expo/vector-icons';

export default function Navbar() {
  return (
    <View style={styles.container}>

      <Image 
        source={require('../assets/images/logo.png')} 
        style={styles.logo} 
        resizeMode="contain"
      />
     
      <View style={styles.menu}>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Nós</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <MaterialIcons name="category" size={24} color="black" />
          <Text style={styles.menuText}>Funcionalidades</Text>
        </TouchableOpacity>
      </View>

      
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
    backgroundColor: '#dfff00', 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 50,
  },
  logo: {
    width: 50,
    height: 50,
  },
  menu: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  menuText: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  cadastro: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cadastroText: {
    marginRight: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
});


