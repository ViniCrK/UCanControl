import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";

import { db } from "../../services/firebase";
import { ref, onValue } from "firebase/database";

import styles from "./styles";

export default function Main() {
  const [distancia, setDistancia] = useState(0);

  useEffect(() => {
    const fetchDistancia = async () => {
      const distRef = ref(db, "distancia");
      onValue(distRef, (snapshot) => {
        const data = snapshot.val();
        setDistancia(data);
      });
    };

    fetchDistancia();
  }, []);

  const changeBoxBgColor = () => {
    if (distancia <= 5) {
      return styles.distanceBoxDanger;
    } else if (distancia <= 15) {
      return styles.distanceBoxWarning;
    }
    return styles.distanceBoxSafe;
  };

  return (
    <View style={styles.container}>
      <View style={styles.context}>
        <Text style={styles.subtitle}>Lixeiras:</Text>
        <Text style={styles.labelText}>1ª Lixeira</Text>
        <Text style={[styles.distanceBox, changeBoxBgColor()]}>
          {distancia}cm
        </Text>
      </View>
    </View>
  );
}
