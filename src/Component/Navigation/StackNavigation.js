import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Home from '../../screens/Home';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Cart from '../../screens/Cart';
import ProductView from '../../screens/ProductView';
import About from '../../screens/About';
import Profile from '../../screens/Profile';
import Shose from '../../screens/Shose';
import Books from '../../screens/Books';
import Contact from '../../screens/Contact';

const Stack = createNativeStackNavigator();
const StackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: true }}>
      <Stack.Screen
        options={{ headerShown: false }}
        name={'Home'}
        component={Home}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={'About'}
        component={About}
      />
      <Stack.Screen name={'ProductView'} component={ProductView} />
      <Stack.Screen
        options={{ headerShown: true }}
        name={'Shose'}
        component={Shose}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={'Books'}
        component={Books}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={'Contact'}
        component={Contact}
      />
    </Stack.Navigator>
  );
};

export default StackNavigation;

const styles = StyleSheet.create({});
