import React, { useEffect, useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { Input } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Calendar } from 'react-native-calendars';

const Pedidos = () => {
  const [tipoComida, setTipoComida] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [precio, setPrecio] = useState('');
  const [clientes, setClientes] = useState([]);
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [fechaseleccionada, setFechaSeleccionada] = useState(null);
  const [eventosCalendario, setEventosCalendario] = useState({});

  useEffect(() => {
    const obtenerClientes = async () => {
      try {
        const storedClientes = await AsyncStorage.getItem('clients');
        const parsedClientes = storedClientes ? JSON.parse(storedClientes) : [];
        setClientes(parsedClientes);
      } catch (error) {
        console.error('Error al obtener la lista de clientes:', error);
      }
    };

    obtenerClientes();
  }, []);

  const agregarEventoCalendario = (fecha, pedido) => {
    const eventosActualizados = { ...eventosCalendario };

    if (!eventosActualizados[fecha]) {
      eventosActualizados[fecha] = [];
    }

    eventosActualizados[fecha].push(pedido);

    setEventosCalendario(eventosActualizados);
  };

  const handleGuardarPedido = async () => {
    try {
      const pedido = {
        cliente: clienteSeleccionado,
        comida: tipoComida,
        cant: cantidad,
        precioTotal: precio,
        calendarios: fechaseleccionada,
        // Agrega otros datos del pedido aquí
      };
      console.log(clienteSeleccionado)
      agregarEventoCalendario(fechaseleccionada, pedido);

      const pedidosAnteriores = await AsyncStorage.getItem('pedidos');
      const pedidosParseados = pedidosAnteriores ? JSON.parse(pedidosAnteriores) : [];

      pedidosParseados.push(pedido);

      await AsyncStorage.setItem('pedidos', JSON.stringify(pedidosParseados));

      console.log('Pedido guardado:', pedido);
    } catch (error) {
      console.log('Error al guardar el pedido en AsyncStorage:', error);
    }
  };

  return (
    <View>
      <Input
        label="Tipo de comida"
        value={tipoComida}
        onChangeText={(text) => setTipoComida(text)}
      />
      <Input
        label="Cantidad"
        value={cantidad}
        onChangeText={(text) => setCantidad(text)}
        keyboardType="numeric"
      />
      <Input
        label="Precio"
        value={precio}
        onChangeText={(text) => setPrecio(text)}
        keyboardType="numeric"
      />
      <View>
        <Calendar
          markedDates={eventosCalendario}
          onDayPress={(day) => {
            setFechaSeleccionada(day.dateString);
            const pedidosDelDia = eventosCalendario[day.dateString];
            console.log('Pedidos del día', pedidosDelDia);
          }}
        />
      </View>
      <Picker
        selectedValue={clienteSeleccionado}
        onValueChange={(itemValue) => {
          setClienteSeleccionado(itemValue);
        }}
      >
        <Picker.Item label="Seleccionar cliente" value={null} />
        {clientes.map((cliente, index) => (
          <Picker.Item key={index} label={cliente.name} value={cliente.phoneNumber, cliente.name} />
        ))}
      </Picker>
      <Button title="Guardar Pedido" onPress={handleGuardarPedido} />
    </View>
  );
};

export default Pedidos;
