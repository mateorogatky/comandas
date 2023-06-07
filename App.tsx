import { StyleSheet, Text, View } from 'react-native';
import Home from './src/Home'
import User from './src/user/User'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Calendars from './src/Calendar/Calendars';


export default function App() {

  const Stack = createStackNavigator();


  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="User" component={User} />
        <Stack.Screen name="Calendar" component={Calendars} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
