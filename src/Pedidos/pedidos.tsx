import React, { useEffect, useState } from 'react';
import { View, Button } from 'react-native';
import { Input } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Calendar } from 'react-native-calendars';

const Pedidos = () => {
  interface EventosCalendario {
    [fecha: string]: any[];
  }

  interface Pedido {
    cliente: string;
    comida: string;
    cant: string;
    precioTotal: string;
    calendarios: string; // Agrega esta propiedad para almacenar la fecha del pedido
    // Otros campos del pedido
  }

  const [tipoComida, setTipoComida] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [precio, setPrecio] = useState('');
  const [clientes, setClientes] = useState([]);
  const [clienteSeleccionado, setClienteSeleccionado] = useState<string | null>(null);
  const [fechaseleccionada, setFechaSeleccionada] = useState<string | null>(null);
  const [eventosCalendario, setEventosCalendario] = useState<EventosCalendario>({});

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

    const cargarPedidos = async () => {
      try {
        const storedPedidos = await AsyncStorage.getItem('pedidos');
        const parsedPedidos: Pedido[] = storedPedidos ? JSON.parse(storedPedidos) : [];

        const eventosActualizados: EventosCalendario = {};

        parsedPedidos.forEach((pedido) => {
          const fecha = pedido.calendarios;

          if (!eventosActualizados[fecha]) {
            eventosActualizados[fecha] = [];
          }

          eventosActualizados[fecha].push(pedido);
        });

        setEventosCalendario(eventosActualizados);
      } catch (error) {
        console.error('Error al cargar los pedidos:', error);
      }
    };

    obtenerClientes();
    cargarPedidos();
  }, []);

  const agregarEventoCalendario = (fecha: string, pedido: Pedido) => {
    const eventosActualizados: EventosCalendario = { ...eventosCalendario };

    if (!eventosActualizados[fecha]) {
      eventosActualizados[fecha] = [];
    }

    eventosActualizados[fecha].push(pedido);

    setEventosCalendario(eventosActualizados);
  };

  const handleGuardarPedido = async () => {
    try {
      const pedido: Pedido = {
        cliente: clienteSeleccionado || '',
        comida: tipoComida,
        cant: cantidad,
        precioTotal: precio,
        calendarios: fechaseleccionada || '', // Guarda la fecha en la propiedad "calendarios"
        // Agrega otros datos del pedido aquí
      };

      agregarEventoCalendario(pedido.calendarios, pedido);

      const pedidosAnteriores = await AsyncStorage.getItem('pedidos');
      const pedidosParseados: Pedido[] = pedidosAnteriores ? JSON.parse(pedidosAnteriores) : [];

      pedidosParseados.push(pedido);

      await AsyncStorage.setItem('pedidos', JSON.stringify(pedidosParseados));
      const eventosAnteriores = await AsyncStorage.getItem('eventosCalendario');
      const eventosParseados = eventosAnteriores ? JSON.parse(eventosAnteriores) : {};
  
      if (!eventosParseados[fechaseleccionada]) {
        eventosParseados[fechaseleccionada] = [];
      }
  
      eventosParseados[fechaseleccionada].push(pedido);
  
      await AsyncStorage.setItem('eventosCalendario', JSON.stringify(eventosParseados));
  
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
        onChangeText={setTipoComida}
      />
      <Input
        label="Cantidad"
        value={cantidad}
        onChangeText={setCantidad}
        keyboardType="numeric"
      />
      <Input
        label="Precio"
        value={precio}
        onChangeText={setPrecio}
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
          <Picker.Item key={index} label={cliente.name} value={cliente.phoneNumber} />
        ))}
      </Picker>
      <Button title="Guardar Pedido" onPress={handleGuardarPedido} />
    </View>
  );
};

export default Pedidos;
