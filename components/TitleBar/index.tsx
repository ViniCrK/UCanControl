import React from "react";
import { View, Text } from "react-native";

import styles from "./styles";

function TitleBar() {
  return (
    <View style={styles.boxTitle}>
      <Text style={styles.titleText}>UCanControl</Text>
    </View>
  );
}

export default TitleBar;
