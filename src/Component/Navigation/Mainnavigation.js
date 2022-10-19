import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainPage from '../../mainScreens/MainPage';
import BottomNav from './BottomNav';

const Stack = createNativeStackNavigator();

const Mainnavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="MainPage"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen
        options={{ headerShown: false }}
        name={'MainPage'}
        component={MainPage}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={'BottomNav'}
        component={BottomNav}
      />
    </Stack.Navigator>
  );
};

export default Mainnavigation;

const styles = StyleSheet.create({});
