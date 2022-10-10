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
      screenOptions={{ headerShow: false }}>
      <Stack.Screen name={'Home'} component={Home} />
      <Stack.Screen name={'Cart'} component={Cart} />
      <Stack.Screen name={'About'} component={About} />
      <Stack.Screen name={'Profile'} component={Profile} />
      <Stack.Screen name={'ProductView'} component={ProductView} />
      <Stack.Screen name={'Shose'} component={Shose} />
      <Stack.Screen name={'Books'} component={Books} />
      <Stack.Screen name={'Contact'} component={Contact} />
    </Stack.Navigator>
  );
};

export default StackNavigation;

const styles = StyleSheet.create({});
