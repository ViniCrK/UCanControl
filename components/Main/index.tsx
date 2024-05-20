import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";

import { db } from "../../services/firebase";
import { ref, onValue } from "firebase/database";

import styles from "./styles";

export default function Main() {
  const [distancia, setDistancia] = useState(0);
  const [statusSensor, setStatusSensor] = useState(false);

  useEffect(() => {
    const fetchDistancia = async () => {
      const distRef = ref(db, "distancia");
      onValue(distRef, (snapshot) => {
        const dist = snapshot.val();
        setDistancia(dist);
      });
    };

    const fetchStatusSensor = async () => {
      const statusSensorRef = ref(db, "statusSensor");
      onValue(statusSensorRef, (snapshot) => {
        const status = snapshot.val();
        setStatusSensor(status);
      });
    };

    fetchDistancia();
    fetchStatusSensor();
  }, []);

  const distanceMessages = {
    danger: "Precisa ser removido",
    warning: "Precisa de atenção",
    safe: "Não precisa remover",
  };

  function showDistanceMessage() {
    if (distancia <= 5) {
      return distanceMessages.danger;
    } else if (distancia <= 15) {
      return distanceMessages.warning;
    }
    return distanceMessages.safe;
  }

  function changeDistanceBgColor() {
    if (distancia <= 5) {
      return styles.distanceBoxDanger;
    } else if (distancia <= 15) {
      return styles.distanceBoxWarning;
    }
    return styles.distanceBoxSafe;
  }

  const rfidSensorMessage = "💳 Passe o cartão no sensor!";

  function showRfidSensorMessage() {
    if (statusSensor == true) {
      return rfidSensorMessage;
    }
    return;
  }

  return (
    <View style={styles.container}>
      <View style={styles.context}>
        <Text style={styles.subtitle}>Distâncias:</Text>
        <View style={styles.row}>
          <Text style={styles.labelText}>Lixeira:</Text>
          <Text style={[styles.distanceBox, changeDistanceBgColor()]}>
            {distancia}cm
          </Text>
        </View>
        <Text style={[styles.alertText, changeDistanceBgColor()]}>
          🗑️ {showDistanceMessage()}
        </Text>
        <Text style={[styles.alertText]}>{showRfidSensorMessage()}</Text>
      </View>
    </View>
  );
}
