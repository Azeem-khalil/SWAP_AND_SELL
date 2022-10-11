import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Cart from '../../screens/Cart';
import { Center, Pressable } from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Profile from '../../screens/Profile';
import StackNavigation from './StackNavigation';

const Tab = createBottomTabNavigator();
const CustomTab = ({ children, onPress }) => {
  <Pressable
    onPress={onPress}
    h={70}
    w={70}
    rounded={'full'}
    shadow={2}
    bg={'#334234'}
    top={-30}>
    {children}
  </Pressable>;
};
const BottomNav = () => {
  return (
    <Tab.Navigator
      backBehavior="Main"
      initialRouteName="Main"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: { ...styles.tab },
        tabBarHideOnKeyboard: true,
      }}>
      {/*start PROFILE */}
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <Center>
              {focused ? (
                <FontAwesome name="user" size={24} color={'#ffffff'} />
              ) : (
                <AntDesign name="user" size={24} color={'#696969'} />
              )}
            </Center>
          ),
          headerShown: false,
        }}
      />
      {/* Home */}
      <Tab.Screen
        name="Main"
        component={StackNavigation}
        options={{
          tabBarIcon: ({ focused }) => (
            <Center>
              {focused ? (
                <Entypo name="home" size={24} color={'#ffffff'} />
              ) : (
                <AntDesign name="home" size={24} color={'#696969'} />
              )}
            </Center>
          ),
          headerShown: false,
        }}
      />
      {/*start Cart */}
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          // tabBarButton: props => <CustomTab {...props} />,
          tabBarIcon: ({ focused }) => (
            <Center>
              {focused ? (
                <Entypo name="shopping-cart" size={24} color={'#ffffff'} />
              ) : (
                <AntDesign name="shoppingcart" size={24} color={'#696969'} />
              )}
            </Center>
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};
export default BottomNav;

const styles = StyleSheet.create({
  tab: {
    elevation: 0,
    backgroundColor: '#000000',
    height: 60,
  },
});
