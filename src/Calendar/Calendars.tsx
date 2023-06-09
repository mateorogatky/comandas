import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Calendar } from 'react-native-calendars';
import { View, Text, StyleSheet } from 'react-native';

const Calendars = () => {
  const [selected, setSelected] = useState('');
  const [eventosCalendario, setEventosCalendario] = useState({});
  const [pedidosDelDia, setPedidosDelDia] = useState([]);

  const cargarEventosCalendario = async () => {
    try {
      const storedEventosCalendario = await AsyncStorage.getItem('eventosCalendario');
      const parsedEventosCalendario = storedEventosCalendario ? JSON.parse(storedEventosCalendario) : {};
      setEventosCalendario(parsedEventosCalendario);
    } catch (error) {
      console.error('Error al cargar los eventos del calendario:', error);
    }
  };

  useEffect(() => {
    cargarEventosCalendario();
  }, []);

  const obtenerPedidosDelDia = (fecha) => {
    const pedidosDelDia = eventosCalendario[fecha] || [];
    console.log('Pedidos del día', pedidosDelDia);
    setPedidosDelDia(pedidosDelDia);
  };

  return (
    <View>
      <Calendar
        markedDates={eventosCalendario}
        onDayPress={(day) => {
          setSelected(day.dateString);
          obtenerPedidosDelDia(day.dateString);
        }}
      />
      <View>
        <Text style={styles.title}>Pedidos del día:</Text>
        {pedidosDelDia.map((pedido, index) => (
  <View key={index}>
    <Text style={styles.clienteText}>Cliente: {pedido.cliente}</Text>
    <Text>Comida: {pedido.comida}</Text>
    <Text>Cantidad: {pedido.cant}</Text>
    <Text>Precio Total: {pedido.precioTotal}</Text>
  </View>
))}

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  clienteText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'blue',
  },
  title:{
    fontSize:20
  }
  

});
 
  // Otros estilos aquí


export default Calendars;
