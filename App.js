// App.js
import * as React from 'react';
import { NativeBaseProvider, StatusBar } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './src/screens/Login';
import Signup from './src/screens/Signup';

import { onAuthStateChanged } from 'firebase/auth';

import Mainnavigation from './src/Component/Navigation/Mainnavigation';
import { auth } from './src/Component/DataBase/firebase';
import { useEffect } from 'react';
import { useState } from 'react';
// console.log(auth);
const Stack = createNativeStackNavigator();
export default function App() {
  const [Authuser, setAuthUser] = useState(null);
  useEffect(() => {
    const userToken = async () => {
      await onAuthStateChanged(auth, user => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          setAuthUser(uid);
          console.log('in use ' + uid);
          // ...
        } else {
          setAuthUser(null);
          console.log('out use ');

          // User is signed out
          // ...
        }
      });
    };
  }, []);

  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <StatusBar hidden={false} />

        <Stack.Navigator
          //initialRouteName="Login"
          screenOptions={{ headerShown: false }}>
          {!Authuser ? (
            <>
              <Stack.Screen
                options={{ headerShown: false }}
                name={'Login'}
                component={Login}
              />
              <Stack.Screen
                options={{ headerShown: false }}
                name={'Signup'}
                component={Signup}
              />
            </>
          ) : (
            <Stack.Screen
              options={{ headerShown: false }}
              name={'Mainnavigation'}
              component={Mainnavigation}
            />
          )}
        </Stack.Navigator>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}

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

// import AuthNav from './src/navigations/AuthNav';
// import AppStackNav from './src/navigations/AppStackNav';
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
