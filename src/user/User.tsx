import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AddClient from './addClient';
import ClientDetails from './clientDetails';
import RemoveClient from './removeClient';

export default function User() {

  return (
    <View style={styles.container}>
          <Text>aca se van a cargar y modificar y elimiar clientes</Text>
          <AddClient/>
          <ClientDetails/>
          <RemoveClient/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  

});