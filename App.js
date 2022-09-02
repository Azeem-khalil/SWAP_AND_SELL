// App.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNav from './src/navigations/AuthNav';
import AppStackNav from './src/navigations/AppStackNav';
//import firebase from '';
//import firebase from '../DataBase/firebase';
import { getAuth, signOut } from 'firebase/auth';
import firebase from './src/DataBase/firebase';
require('firebase/auth');
const auth = getAuth(firebase);
const Stack = createNativeStackNavigator();
function MyStack() {
  return (
    //<AuthNav />
    <AppStackNav />
  );
  // if (auth.currentUser) {
  //   return (
  //     // <AuthNav />
  //     <AppStackNav />
  //   );
  // } else {
  //   return (
  //     <AuthNav />
  //     //<AppStackNav />
  //   );
  // }
}
export default function App() {
  return (
    //<MyStack />
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
