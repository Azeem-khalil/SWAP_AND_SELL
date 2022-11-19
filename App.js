// App.js
import * as React from 'react';
import { Box, NativeBaseProvider, StatusBar, useToast } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './src/screens/Login';
import Signup from './src/screens/Signup';
import Mainnavigation from './src/Component/Navigation/Mainnavigation';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './src/Component/DataBase/firebase';
import { useEffect, useState } from 'react';
import { LogBox } from 'react-native';
import ForgetPassword from './src/screens/ForgetPassword';
// console.log(auth);
const Stack = createNativeStackNavigator();
export default function App() {
  const [Authuser, setAuthUser] = useState(null);
  const [EmailVerified, setEmailVerified] = useState(false);

  const toast = useToast();

  useEffect(() => {
    let isMounted = true;

    const userToken = async () => {
      await onAuthStateChanged(auth, user => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;

          if (isMounted) {
            setAuthUser(uid);
            if (user.emailVerified) {
              setEmailVerified(true);
            } else console.log('in use ' + uid);
          }
          // ...
        } else {
          if (isMounted) {
            setAuthUser(null);
            setEmailVerified(false);
          }
          console.log('user.emailVerified ');
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
  const MainnavigationComponent = () => (
    <Mainnavigation EmailVerified={EmailVerified} />
  );
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
              <Stack.Screen
                options={{ headerShown: false }}
                name={'ForgetPassword'}
                component={ForgetPassword}
              />
            </>
          ) : (
            <Stack.Screen
              options={{ headerShown: false }}
              name={'Mainnavigation'}
              component={MainnavigationComponent}
            />
          )}
        </Stack.Navigator>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
