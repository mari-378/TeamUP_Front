import React, { useState } from "react";
import { View, Button, ScrollView, StyleSheet } from "react-native";
import axios from "axios";
import NomeJogador from "../components/NomeJogador";
import Jogadores from "../components/Jogadores";
import Habilidade from "../components/Habilidade";
import Times from "../components/Times";

export default function PaginaDeSorteio() {
  const [jogadores, setJogadores] = useState([]);
  const [times, setTimes] = useState([]);

  const adicionarJogador = (nome) => {
    if (nome.trim() !== "") {
      setJogadores([...jogadores, { nome, habilidade: 0 }]);
    }
  };

  const removerJogador = (index) => {
    setJogadores(jogadores.filter((_, i) => i !== index));
  };

  const atualizarNivel = (index, nivel) => {
    const copia = [...jogadores];
    copia[index].habilidade = nivel;
    setJogadores(copia);
  };

  const sortearTimes = async () => {
    try {
      const payload = {
        jogadores_por_time: 5,
        jogadores: jogadores,
      };

      const response = await axios.post("http://seu-backend.com/sorteio", payload);
      setTimes(response.data.times);
    } catch (error) {
      console.error("Erro ao sortear times:", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <NomeJogador onAdd={adicionarJogador} />
      <Jogadores jogadores={jogadores.map(j => j.nome)} removerJogador={removerJogador} />

      {jogadores.map((jogador, index) => (
        <Habilidade
          key={index}
          nivelInicial={jogador.experiencia}
          onChange={(nivel) => atualizarNivel(index, nivel)}
          label={`Habilidade de ${jogador.nome}`}
        />
      ))}

      <Button title="Sortear Times" onPress={sortearTimes} />

      {/* Exibir times sorteados */}
      {times.length > 0 && <Times times={times} />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});