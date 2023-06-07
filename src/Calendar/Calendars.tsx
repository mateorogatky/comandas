
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Calendar } from 'react-native-calendars';

const Calendars = () => {
  const [selected, setSelected] = useState('');
  const [eventosCalendario, setEventosCalendario] = useState({});




  return (
    <Calendar
    markedDates={eventosCalendario}
    onDayPress={(day) => {
      setEventosCalendario(day.dateString);
      const pedidosDelDia = eventosCalendario[day.dateString];
      console.log('Pedidos del día', pedidosDelDia);
    }}
  />
  );
};

export default Calendars;