import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const removeClient = () => {
  const [clientes, setClientes] = useState([]);

  // Función para obtener la lista de clientes del AsyncStorage
  const obtenerClientes = async () => {
    try {
      const clientesGuardados = await AsyncStorage.getItem('clients');
      if (clientesGuardados !== null) {
        setClientes(JSON.parse(clientesGuardados));
      }
    } catch (error) {
      console.log('Error al obtener los clientes:', error);
    }
  };

  // Función para eliminar un cliente específico
  const eliminarCliente = async (clienteId) => {
    try {
      const nuevosClientes = clientes.filter((cliente) => cliente.id !== clienteId);
      await AsyncStorage.setItem('clients', JSON.stringify(nuevosClientes));
      setClientes(nuevosClientes);
      console.log('Cliente eliminado correctamente');
    } catch (error) {
      console.log('Error al eliminar el cliente:', error);
    }
  };

  useEffect(() => {
    obtenerClientes();
  }, []);

  // Renderiza cada elemento de la lista de clientes
  const renderCliente = ({ item }) => (
    <View>
      <Text>{item.nombre}</Text>
      <Button title="Eliminar" onPress={() => eliminarCliente(item.id)} />
    </View>
  );

  return (
    <FlatList
      data={clientes}
      renderItem={renderCliente}
      keyExtractor={(item, index) => index.toString()}    />
   
  );
};

export default removeClient;
