import { StyleSheet, Text, View } from 'react-native';
import AddClient from './addClient';
import ClientDetails from './clientDetails';
import RemoveClient from './removeClient';
import { color } from 'react-native-reanimated';

export default function User() {

  return (
    <View style={styles.container}>
      <View style={styles.clientes}>
          <Text style={styles.title}>Cargar clientes nuevos:</Text>
          <AddClient/>
      </View>
      <View style={styles.detalles}>    
          <Text style={styles.title}>Clientes cargados:</Text>
          <ClientDetails/>
      </View>
          <RemoveClient/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c5c6c8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clientes:{
    marginTop:200,
  },
  detalles:{
    marginTop:100
  },
  title:{
    fontSize:20,
  }
  

});