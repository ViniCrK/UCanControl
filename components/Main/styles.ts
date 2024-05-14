import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: "#212529",
    width: "90%",
    height: "auto",
    padding: 10,
    borderRadius: 10,
  },

  context: {
    width: "100%",
    height: "auto",
    padding: 10,
  },

  subtitle: {
    color: "#fff",
    fontSize: 28,
    paddingLeft: 10,
  },

  labelText: {
    color: "#DEE2DB",
    paddingLeft: 20,
    fontSize: 22,
  },

  distanceBox: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    width: "22%",
    padding: 10,
    marginTop: 5,
    marginLeft: 30,
    borderRadius: 4,
    borderStyle: "solid",
    textAlign: "center",
  },

  distanceBoxSafe: {
    backgroundColor: "green",
  },
  distanceBoxWarning: {
    backgroundColor: "#FFCB2B",
  },
  distanceBoxDanger: {
    backgroundColor: "red",
  },
});

export default styles;
