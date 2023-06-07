import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Home() {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("User");
  };

  const handlePress2 = () => {
    navigation.navigate("Calendar");
  };

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text>Hola este es el home</Text>
      </View>
      
        <View  style={styles.buttons}>
          <TouchableOpacity style={[styles.button, styles.firstButton]} onPress={handlePress}>
            <Text style={styles.buttonText}>Clientes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.secondButton]} onPress={handlePress2}>
            <Text style={styles.buttonText}>Calendar</Text>
          </TouchableOpacity>
        </View>
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    flex: 1,
    marginTop: 100,
  },
  button: {
    backgroundColor: "#b2e2f2",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding:10
  },
  firstButton:{
    marginRight:10,
  },
  secondButton:{
    marginLeft:10
  }
});

