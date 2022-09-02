import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Ionicons from 'react-native-vector-icons/Ionicons';

//import TabNavigator from './TabNavigator';
import Profile from '../screens/Profile';
import About from '../screens/About';
import Contact from '../screens/Contact';
import Cart from '../screens/Cart';
import CustomSideBare from '../Component/CustomSideBare';

import Home from '../screens/Home';
//import TabNavigator from './TabNavigator';

const Drawer = createDrawerNavigator();

const AuthStack = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomSideBare {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: '#aa18ea',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: {
          marginLeft: -25,
          fontFamily: 'Roboto-Medium',
          fontSize: 15,
        },
      }}>
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="person-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="About"
        component={About}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="chatbox-ellipses-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Contact"
        component={Contact}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="timer-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Cart"
        component={Cart}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons name="settings-outline" size={22} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default AuthStack;

// import * as React from 'react';
// import { Button, View } from 'react-native';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { NavigationContainer } from '@react-navigation/native';
// // //import TabNavigator from './TabNavigator';
// import Profile from '../screens/Profile';
// import About from '../screens/About';
// import Contact from '../screens/Contact';
// import Cart from '../screens/Cart';
// import CustomSideBare from '../Component/CustomSideBare';

// function HomeScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Button
//         onPress={() => navigation.navigate('Notifications')}
//         title="Go to notifications"
//       />
//     </View>
//   );
// }

// function NotificationsScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Button onPress={() => navigation.goBack()} title="Go back home" />
//     </View>
//   );
// }

// const Drawer = createDrawerNavigator();

// export default function AuthStack() {
//   return (
//     <NavigationContainer>
//       <Drawer.Navigator // initialRouteName="Home"
//         drawerContent={props => <CustomSideBare {...props} />}
//         screenOptions={{
//           headerShown: false,
//           drawerActiveBackgroundColor: '#aa18ea',
//           drawerActiveTintColor: '#fff',
//           drawerInactiveTintColor: '#333',
//           drawerLabelStyle: {
//             marginLeft: -25,
//             fontFamily: 'Roboto-Medium',
//             fontSize: 15,
//           },
//         }}>
//         <Drawer.Screen name="Home" component={Profile} />
//         <Drawer.Screen name="Notifications" component={About} />
//       </Drawer.Navigator>
//     </NavigationContainer>
//   );
// }
