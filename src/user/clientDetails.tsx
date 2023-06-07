import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const clienteDetails = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const getClients = async () => {
      try {
        const storedClients = await AsyncStorage.getItem('clients');
        const parsedClients = storedClients ? JSON.parse(storedClients) : [];
        setClients(parsedClients);
      } catch (error) {
        console.error('Error al obtener la lista de clientes:', error);
      }
    };

    getClients();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.clientItem}>
      <Text>Nombre: {item.name}</Text>
      <Text>Apellido: {item.apellido}</Text>
      <Text>Numero de telefono: {item.phoneNumber}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {clients.length > 0 ? (
       <FlatList
       data={clients}
       renderItem={renderItem}
       keyExtractor={(item, index) => index.toString()}
     />
      ) : (
        <Text>No se encontraron clientes</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clientItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#eaeaea',
    borderRadius: 8,
  },
});

export default clienteDetails;
