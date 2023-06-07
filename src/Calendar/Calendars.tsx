
import React, {useState} from 'react';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

const Calendars = () => {
  const [selected, setSelected] = useState('');
  const [eventosCalendario, setEventosCalendario] = useState({});


  const agregarEventoCalendario = (fecha, pedido) => {
    const eventosActualizados = { ...eventosCalendario };
    
    if (!eventosActualizados[fecha]) {
      eventosActualizados[fecha] = [];
    }
  
    eventosActualizados[fecha].push(pedido);
  
    setEventosCalendario(eventosActualizados);
  };

  return (
    <View>
    <Calendar
      markedDates={eventosCalendario}
      onDayPress={(day) => {
        // Implementa la lógica para mostrar los pedidos del día seleccionado
        const pedidosDelDia = eventosCalendario[day.dateString];
        console.log('Pedidos del día', pedidosDelDia);
      }}
    />
  </View>
  );
};

export default Calendars;