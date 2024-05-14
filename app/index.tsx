import React from "react";
import { StyleSheet, View } from "react-native";

import TitleBar from "@/components/TitleBar";
import Main from "@/components/Main";

export default function Index() {
  return (
    <View style={styles.container}>
      <TitleBar />
      <Main />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2B3035",
    alignItems: "center",
    justifyContent: "center",
  },
});
