// App.js
import * as React from 'react';
import { NativeBaseProvider, Box, HStack, Input } from 'native-base';

import { useEffect, useState } from 'react';
import { AsyncStorage, View } from 'react-native';
//import Constants from 'expo-constants';
//import { Card } from 'react-native-paper';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNav from './src/navigations/AuthNav';
import AppStackNav from './src/navigations/AppStackNav';
//import firebase from '';
//import firebase from '../DataBase/firebase';
import { getAuth, signOut } from 'firebase/auth';
import firebase from './src/DataBase/firebase';
import ProductView from './src/screens/ProductView';
import Cart from './src/screens/Cart';
import Home from './src/screens/Home';
//import { AsyncStorage } from '@react-native-async-storage/async-storage';

// function MyStack() {
//   return (
//     <AuthNav />
//     //<AppStackNav />
//   );
//   // if (auth.currentUser) {
//   //   return (
//   //     // <AuthNav />
//   //     <AppStackNav />
//   //   );
//   // } else {
//   //   return (
//   //     <AuthNav />
//   //     //<AppStackNav />
//   //   );
//   // }
// }

//import { AsyncStorage } from 'react-native';
require('firebase/auth');
const auth = getAuth(firebase);
console.log(auth);

export default function App() {
  // const [userData, setUserData] = useState([]);
  // const getEntries = async () => {
  //   await AsyncStorage.setItem('key', 'val1');
  //   const value = await AsyncStorage.getItem('key');
  //   setUserData(AsyncStorage.getItem('LOGIN_TOKEN'));
  //   console.log(value);
  // };

  // useEffect(() => {
  //   getEntries();
  // }, []);
  // console.log(userData);
  return (
    //<MyStack />
    <NavigationContainer>
      <NativeBaseProvider>
        <ProductView />
        {
          //<AppStackNav />
        }
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
