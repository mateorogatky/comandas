import React, { useState } from 'react';
import { View, Text, Button, Modal, StyleSheet } from 'react-native';

export const SuccessAlert = ({ isVisible, onClose }) => {
    if (!isVisible) {
      return null;
    }
  
    return (
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.successText}>¡Éxito!</Text>
          <Text>Tu acción se ha completado correctamente.</Text>
          <Button title="Cerrar" onPress={onClose} />
        </View>
      </View>
    );
  };

  const styles = StyleSheet.create({
    modalContainer: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 8,
    },
    successText: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
  });
  
  