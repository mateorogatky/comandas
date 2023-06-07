import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddClient = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('')
  const [apellido, setApellido] = useState('')

  const handleAddClient = async () => {
    // Validar que se ingrese un nombre y un correo electrónico
    if (name === '' || phoneNumber === '' || apellido === '' ) {
      Alert.alert('Error', 'Por favor, ingrese un nombre y un numero de telefono');
      return;
    }

    try {
      // Obtener clientes existentes de AsyncStorage
      const existingClients = await AsyncStorage.getItem('clients');
      const parsedClients = existingClients ? JSON.parse(existingClients) : [];

      // Verificar si el cliente ya existe
      const existingClient = parsedClients.find((client) => client.phoneNumber === phoneNumber);
      if (existingClient) {
        Alert.alert('Error', 'El cliente ya existe');
        return;
      }

      // Agregar el nuevo cliente a la lista
      const newClient = { name,apellido ,phoneNumber };
      const updatedClients = [...parsedClients, newClient];

      // Guardar la lista de clientes en AsyncStorage
      await AsyncStorage.setItem('clients', JSON.stringify(updatedClients));

      // Limpiar los campos de entrada
      setName('');
      setPhoneNumber('');
      setApellido('')

      // Mostrar una alerta de éxito
      Alert.alert('Éxito', 'Cliente agregado exitosamente');
    } catch (error) {
      console.error('Error al agregar el cliente:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nombre"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        placeholder="Apellido"
        value={apellido}
        onChangeText={(text) => setApellido(text)}
      />
      <TextInput
        placeholder="Numero de telefono"
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text)}
      />
      <Button title="Agregar cliente" onPress={handleAddClient} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#b2e2f2",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default AddClient;




