import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import { MaterialIcons, Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { useTheme } from "../contexts/ThemeContext";
import { useTranslation } from "react-i18next";

export default function Cronometro() {
  const { temaAtual } = useTheme();
  const { t } = useTranslation();
  const [time, setTime] = useState(0); // tempo em segundos
  const [running, setRunning] = useState(false);
  const [customMinutes, setCustomMinutes] = useState("");
  const intervalRef = useRef(null);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const start = () => {
    if (running) return;
    setRunning(true);
    intervalRef.current = setInterval(() => {
      setTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
  };

  const pause = () => {
    setRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const reset = () => {
    pause();
    setTime(0);
  };

  const setPredefinedTime = (minutes) => {
    setTime(minutes * 60);
    pause();
  };

  const addCustomTime = () => {
    const minutes = parseInt(customMinutes);
    if (!isNaN(minutes) && minutes > 0) {
      setTime(minutes * 60);
      setCustomMinutes("");
      pause();
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: temaAtual.fundo }]}>
      <View style={styles.timerBox}>
        <Text style={styles.timerText}>{formatTime(time)}</Text>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity style={styles.button} onPress={start}>
          <MaterialIcons name="play-arrow" size={22} color="#000" />
          <Text style={styles.buttonText}>{t('timer.start')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={pause}>
          <Ionicons name="pause" size={22} color="#000" />
          <Text style={styles.buttonText}>{t('timer.pause')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={reset}>
          <MaterialIcons name="refresh" size={22} color="#000" />
          <Text style={styles.buttonText}>{t('timer.reset')}</Text>
        </TouchableOpacity>
      </View>

      <Text style={[styles.subtitle, { color: temaAtual.texto }]}>{t('timer.predefinedTimes')}</Text>
      <View style={styles.predefinedContainer}>
        {[10, 12, 15, 45, 60].map((m) => (
          <TouchableOpacity
            key={m}
            style={[styles.predefinedButton, { borderColor: temaAtual.textoSecundario }]}
            onPress={() => setPredefinedTime(m)}
          >
            <Text style={[styles.predefinedText, { color: temaAtual.textoSecundario }]}>{m} min</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={[styles.subtitle, { color: temaAtual.texto }]}>{t('timer.personalizedTime')}</Text>
      <View style={styles.customContainer}>
        <TextInput
          style={[styles.input, { color: temaAtual.texto }]}
          keyboardType="numeric"
          placeholder={t('timer.placeholder')}
          value={customMinutes}
          onChangeText={setCustomMinutes}
        />
        <TouchableOpacity style={styles.addButton} onPress={addCustomTime}>
          <FontAwesome5 name="plus" size={12} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f3e8",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  timerBox: {
    backgroundColor: "#e5f87f",
    borderRadius: 12,
    paddingVertical: 30,
    paddingHorizontal: 50,
    marginBottom: 20,
  },
  timerText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#000",
  },
  controls: {
    flexDirection: "row",
    marginBottom: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginHorizontal: 5,
  },
  buttonText: {
    fontSize: 16,
    marginLeft: 5,
    color: "#000",
  },
  subtitle: {
    fontSize: 16,
    marginVertical: 10,
  },
  predefinedContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 20,
  },
  predefinedButton: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    margin: 5,
  },
  predefinedText: {
    fontSize: 14,
  },
  customContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: 100,
    marginRight: 10,
    textAlign: "center",
  },
  addButton: {
    backgroundColor: "blue",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});
