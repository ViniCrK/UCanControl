import React, { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";

import { db } from "../../services/firebase";
import { ref, onValue } from "firebase/database";

import styles from "./styles";
import { ILixeira } from "../../models/Lixeira";

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

  const distanceMessages = {
    danger: "Precisa ser removido",
    warning: "Precisa de atenção",
    safe: "Não precisa remover",
  };

  function showDistanceMessage(distancia: number) {
    if (distancia <= 5) {
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

  function showRfidSensorMessage(status: boolean) {
    const rfidSensorMessage = "💳 Passe o cartão no sensor!";

    if (status == false) {
      return rfidSensorMessage;
    }
    return;
  }

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
              🗑️ {showDistanceMessage(lixeira.distancia)}
            </Text>
            <Text style={[styles.alertText]}>
              {showRfidSensorMessage(lixeira.foiTrocado)}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
