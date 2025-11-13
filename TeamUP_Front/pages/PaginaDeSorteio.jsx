import React, { useState } from "react";
import { View, Button, ScrollView, StyleSheet, TextInput, TouchableOpacity, Text } from "react-native";
import axios from "axios";
import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import Times from "../components/Times";
import { useTheme } from "../contexts/ThemeContext";
import { useTranslation } from 'react-i18next';
import MudarTema from '@/components/MudarTema';
import MudarLingua from '@/components/MudarLingua';

export default function PaginaDeSorteio() {
  const [jogadores, setJogadores] = useState([]);
  const [nome, setNome] = useState("");
  const [habilidadeTemp, setHabilidadeTemp] = useState(0);
  const [times, setTimes] = useState([]);
  const { temaAtual } = useTheme();
  const { t } = useTranslation();

  const params = useLocalSearchParams(); 
  const maxPorTime = params.maxPorTime ? Number(params.maxPorTime) : 2; // padrão 2 se não vier

  const adicionarJogador = () => {
    if (nome.trim() !== "") {
      setJogadores([...jogadores, { nome, habilidade: habilidadeTemp }]);
      setNome("");
      setHabilidadeTemp(0);
    }
  };

  const removerJogador = (index) => {
    setJogadores(jogadores.filter((_, i) => i !== index));
  };

  const sortearTimes = async () => {
    try {
      const payload = {
        maxPorTime: maxPorTime,
        jogadores: jogadores,
      };

      const response = await axios.post("http://localhost:3000/sorteio", payload);
      setTimes(response.data.times);
    } catch (error) {
      if (error.response) {
        console.error("Erro do servidor:", error.response.status, error.response.data);
      } else if (error.request) {
        console.error("Nenhuma resposta recebida:", error.request);
      } else {
        console.error("Erro ao configurar requisição:", error.message);
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: temaAtual.fundo }]}>
      <View style={styles.head}>
        <Text style={[styles.titulo, { color: temaAtual.texto }]}>{t('featureOptions.rules')}</Text>
        <View style={styles.botoesTroca}>
            <MudarLingua testID="btn-mudar-lingua"/>
            <MudarTema testID="btn-mudar-tema"/>
        </View>               
      </View>
      
      <View style={styles.inputRow}>
        <TextInput 
          testID = "input-nome-jogador"
          style={[styles.input, { backgroundColor: temaAtual.caixaTexto }]}
          placeholder={t('draw.placeholder')}
          placeholderTextColor={temaAtual.textoAzul}
          value={nome}
          onChangeText={setNome}
         
        />
        <TouchableOpacity style={styles.addButton} onPress={adicionarJogador} testID="btn-adicionar-jogador">
          <MaterialIcons name="add" size={22} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.starsRow} testID="grupo-estrelas-habilidade">
        {[1, 2, 3, 4, 5].map((num) => (
          <TouchableOpacity key={num} onPress={() => setHabilidadeTemp(num)} testID={`estrela-habilidade-${num}`}>
            <MaterialIcons
              name={num <= habilidadeTemp ? "star" : "star-border"}
              size={30}
              color={temaAtual.caixaTexto}
              style={styles.star}
            />
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.playersContainer} testID="lista-jogadores">
        {jogadores.map((jogador, index) => (
          <View key={index} style={styles.playerBadge} testID={`jogador-${index}`}>
            <Text style={styles.playerText}>{jogador.nome}</Text>
            <View style={styles.habilidadeInline}>
              <Text style={styles.habilidadeNum}>{jogador.habilidade}</Text>
              <MaterialIcons name="star" size={18} color={temaAtual.caixaTexto} />
            </View>
            <TouchableOpacity onPress={() => removerJogador(index)}
                testID={`btn-remover-jogador-${index}`}>
              <MaterialIcons name="delete" size={18} color="white" />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <Button title={t('draw.drawTeams')} color={temaAtual.botao} onPress={sortearTimes} testID="btn-sortear-times" />

      {times.length > 0 && <Times times={times} testID="times-gerados"/>}

      <View style={{ marginTop: 10 }}>
        <Button
          title={t('draw.resetTeams')}
          color={temaAtual.botao}
          onPress={() => setTimes([])}
          testID="btn-resetar-times"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    height: '100%'
  },
  head: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    titulo: {
        fontSize: 30,
        paddingLeft: 30,
        paddingTop: 10,
    },
    botoesTroca: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10,
    },
    input: {
      flex: 1,
      borderRadius: 15,
      paddingHorizontal: 12,
      height: 40,
      fontSize: 14,
      color: "#000",
    },
    addButton: {
      backgroundColor: "blue",
      marginLeft: 6,
      borderRadius: 15,
      width: 40,
      height: 40,
      justifyContent: "center",
      alignItems: "center",
    },
    starsRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 15,
    },
    star: {
      marginRight: 6,
    },
    playersContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginVertical: 10,
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
    habilidadeInline: {
      flexDirection: "row",
      alignItems: "center",
      marginRight: 6,
    },
    habilidadeNum: {
      color: "white",
      marginRight: 2,
    },
  });
