import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useTheme } from '../contexts/ThemeContext';
import { Cores } from '../constants/Cores';

export default function CardPontuacao() {
  const { temaAtual } = useTheme();
  const [nome, setNome] = useState('');
  const [pontuacao, setPontuacao] = useState(null);

  return (
    <View style={[styles.container, { backgroundColor: Cores[temaAtual].cardBackground }]}>
      {/* Nome do jogador */}
      <TextInput
        style={[styles.input, { color: Cores[temaAtual].texto }]}
        placeholder="Digite o nome do jogador"
        placeholderTextColor={Cores[temaAtual].textoSecundario}
        value={nome}
        onChangeText={setNome}
      />

      {/* Seleção de pontuação */}
      <Picker
        selectedValue={pontuacao}
        onValueChange={(valor) => setPontuacao(valor)}
        style={styles.picker}
      >
        <Picker.Item label="Selecione a pontuação" value={null} />
        {[1, 2, 3, 4, 5].map((num) => (
          <Picker.Item key={num} label={`${num}`} value={num} />
        ))}
      </Picker>

      {/* Mostrar nome + pontuação */}
      {nome !== '' && pontuacao && (
        <Text style={[styles.resultado, { color: Cores[temaAtual].texto }]}>
          {nome}: {pontuacao} ★
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    padding: 10,
    width: '90%',
    marginBottom: 10,
    fontSize: 16,
  },
  picker: {
    width: '90%',
    marginBottom: 10,
  },
  resultado: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
