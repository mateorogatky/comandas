import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "./CustomButton";

export default function Home() {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("User");
  };

  const handlePress3 = () => {
    navigation.navigate("Pedidos");
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
          <TouchableOpacity style={[styles.button, styles.firstButton]} >
            <CustomButton title='Clientes' onPress={handlePress}/>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.secondButton]} >
            <CustomButton  title='Calendar' onPress={handlePress2}/>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.threeButton]} >
            <CustomButton title='Pedidos' onPress={handlePress3}/>
          </TouchableOpacity>
        </View>
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#c5c6c8",
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
    marginRight:5,
  },
  secondButton:{
    marginLeft:5
  },
  threeButton:{
    marginLeft:10
  }
});

