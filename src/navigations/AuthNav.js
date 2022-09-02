// App.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signup from '../screens/Signup';
import Login from '../screens/Login';
import Dashboard from '../screens/Dashboard';
import AppStackNav from '../navigations/AppStackNav';
const Stack = createNativeStackNavigator();

const AuthNav = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="Login"
        component={Login}
        options={({ title: 'Login' }, { headerLeft: null })}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{ title: 'Signup' }}
      />
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={({ title: 'HOME PAGE' }, { headerLeft: null })}
      />
    </Stack.Navigator>

    // <Stack.Navigator screenOptions={{ headerShown: false }}>
    //   <Stack.Screen name="Onboarding" component={Signup} />
    //   <Stack.Screen name="Login" component={Login} />
    //   <Stack.Screen name="Register" component={Dashboard} />
    // </Stack.Navigator>
  );
};

export default AuthNav;
