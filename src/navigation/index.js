
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../containers/home';
import Map from '../containers/map';
import Map2 from '../containers/map2';
import Map3 from '../containers/map3';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Map" component={Map} />
      <Stack.Screen name="Map2" component={Map2} />
      <Stack.Screen name="Map3" component={Map3} />
    </Stack.Navigator>
    </NavigationContainer>
  )
}
export default AppNavigator;