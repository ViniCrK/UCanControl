import React, { useState, useEffect } from "react";
import { View, Text, Alert } from "react-native";

import { db } from "../../services/firebase";
import { ref, onValue } from "firebase/database";

import styles from "./styles";
import { ILixeira } from "../../models/Lixeira";

const showAlert = (lixeiraId: number) => {
  Alert.alert("Remoção de lixo", `Retire o lixo da Lixeira ${lixeiraId}!`, [
    {
      text: "Não há lixo?",
      onPress: () =>
        Alert.alert(
          "Desculpe pelo incômodo.",
          "Ainda estamos em fase de testes."
        ),
    },
    {
      text: "Cancelar",
      onPress: () => console.log("Requisição da remoção: NEGADA"),
    },
    {
      text: "OK",
      onPress: () => console.log("Requisição da remoção: ACEITA"),
    },
  ]);
};

const distanceMessages = {
  danger: "Precisa ser removido",
  warning: "Precisa de atenção",
  safe: "Não precisa remover",
};

function showDistanceMessage(lixeiraID: number, distancia: number) {
  if (distancia <= 5) {
    showAlert(lixeiraID);
    return distanceMessages.danger;
  } else if (distancia <= 15) {
    return distanceMessages.warning;
  }
  return distanceMessages.safe;
}

function changeDistanceBgColor(distancia: number) {
  if (distancia <= 5) {
    return styles.distanceBoxDanger;
  } else if (distancia <= 15) {
    return styles.distanceBoxWarning;
  }
  return styles.distanceBoxSafe;
}

export default function Main() {
  const [lixeiras, setLixeiras] = useState<ILixeira[]>([]);

  useEffect(() => {
    const fetchLixeiras = async () => {
      const lixeiraRef = ref(db, "lixeiras/");

      onValue(lixeiraRef, (snapshot) => {
        const listaLixeiras: ILixeira[] = [];

        snapshot.forEach((lixeira) => {
          listaLixeiras.push(lixeira.val());
        });
        setLixeiras(listaLixeiras);
      });
    };

    fetchLixeiras();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.context}>
        <Text style={styles.subtitle}>Distâncias:</Text>
        {lixeiras.map((lixeira) => (
          <View key={lixeira.id}>
            <View style={styles.row}>
              <Text style={styles.labelText}>Lixeira {lixeira.id}: </Text>
              <Text
                style={[
                  styles.distanceBox,
                  changeDistanceBgColor(lixeira.distancia),
                ]}
              >
                {lixeira.distancia}cm
              </Text>
            </View>
            <Text
              style={[
                styles.alertText,
                changeDistanceBgColor(lixeira.distancia),
              ]}
            >
              🗑️ {showDistanceMessage(lixeira.id, lixeira.distancia)}
            </Text>
            {/* <Text style={[styles.alertText]}>
              {showRfidSensorMessage(lixeira.foiTrocado)}
            </Text> */}
          </View>
        ))}
      </View>
    </View>
  );
}
