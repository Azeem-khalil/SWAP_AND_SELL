// App.js
import * as React from 'react';
import { NativeBaseProvider, StatusBar } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './src/screens/Login';
import Signup from './src/screens/Signup';
import Mainnavigation from './src/Component/Navigation/Mainnavigation';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './src/Component/DataBase/firebase';
import { useEffect, useState } from 'react';
import { LogBox } from 'react-native';
// console.log(auth);
const Stack = createNativeStackNavigator();
export default function App() {
  const [Authuser, setAuthUser] = useState(null);
  useEffect(() => {
    let isMounted = true;

    const userToken = async () => {
      await onAuthStateChanged(auth, user => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          if (isMounted) setAuthUser(uid);
          console.log('in use ' + uid);
          // ...
        } else {
          if (isMounted) setAuthUser(null);
          console.log('out use ');

          // User is signed ou
          // ...
        }
      });
    };
    userToken();
    return () => {
      isMounted = false;
    };
  }, []);
  LogBox.ignoreLogs(["EventEmitter.removeListener('appStateDidChange', ...)"]);
  LogBox.ignoreLogs([
    "Can't perform a React state update on an unmounted component",
  ]);
  LogBox.ignoreLogs([
    'AsyncStorage has been extracted from react-native core and will be removed in a future release. ',
  ]);
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
