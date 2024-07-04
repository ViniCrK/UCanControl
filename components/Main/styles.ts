import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5C4E4E",
    width: "90%",
    height: "auto",
    paddingTop: 10,
    paddingBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
  },

  context: {
    width: "100%",
    height: "auto",
    padding: 10,
  },

  subtitle: {
    color: "#A47551",
    fontSize: 28,
    paddingLeft: 10,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 20,
    marginTop: 5,
  },

  labelText: {
    color: "#D1D0D0",
    fontSize: 22,
    paddingLeft: 20,
  },

  distanceBox: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    padding: 10,
    marginLeft: 10,
    borderRadius: 5,
    borderStyle: "solid",
    borderColor: "#fff",
    borderWidth: 1,
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

  alertText: {
    color: "#fff",
    fontSize: 20,
    alignSelf: "center",
    padding: 8,
    marginTop: 10,
    borderRadius: 5,
  },
});

export default styles;
