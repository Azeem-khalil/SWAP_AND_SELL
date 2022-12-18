import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainPage from '../../mainScreens/MainPage';
import BottomNavShoes from './BottomNavShoes';
import BottomNavBook from './BottomNavBook';
import Edit_Profile from '../../screens/Edit_Profile';
import SingleProductView from '../../screens/Bookswapscreen/SingleProductView';
import ProductView from '../../screens/ProductView';

import Favourite from '../../screens/Bookswapscreen/Favourite';

const Stack = createNativeStackNavigator();

const Mainnavigation = props => {
  const MainPageComponent = () => (
    <MainPage EmailVerified={props.EmailVerified} />
  );
  return (
    <Stack.Navigator
      initialRouteName="MainPage"
      screenOptions={{ headerShown: true }}>
      <Stack.Screen
        options={{ headerShown: false }}
        name={'MainPage'}
        component={MainPageComponent}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={'BottomNavShoes'}
        component={BottomNavShoes}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={'BottomNavBook'}
        component={BottomNavBook}
      />
      <Stack.Screen name={'Edit_Profile'} component={Edit_Profile} />
      <Stack.Screen name={'SingleProductView'} component={SingleProductView} />
      <Stack.Screen name={'ProductView'} component={ProductView} />
      <Stack.Screen name={'Favourite'} component={Favourite} />
    </Stack.Navigator>
  );
};

export default Mainnavigation;

const styles = StyleSheet.create({});
