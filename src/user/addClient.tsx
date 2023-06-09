import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Alert, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import  { SuccessAlert }  from '../alertExito'
import CustomButton from '../CustomButton';

const AddClient = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('')
  const [apellido, setApellido] = useState('')

  const [isSuccessVisible, setSuccessVisible] = useState(false);


  const handleCloseSuccess = () => {
    setSuccessVisible(false);
  };
 
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
      setSuccessVisible(true);
      

    } catch (error) {
      console.error('Error al agregar el cliente:', error);
      setSuccessVisible(false);
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
    
      <TouchableOpacity style={styles.container}>
      <CustomButton title="Agregar Cliente" onPress={handleAddClient} />
    </TouchableOpacity>
     
     <SuccessAlert isVisible={isSuccessVisible} onClose={handleCloseSuccess} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#c5c6c8",
    alignItems: "center",
    justifyContent: "center",
    borderColor: '#fff',
    borderWidth: 0.5,
    
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
});

export default AddClient;




