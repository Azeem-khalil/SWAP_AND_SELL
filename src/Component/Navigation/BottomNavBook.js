import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Cart from '../../screens/Cart';
import { Center, Pressable } from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Profile from '../../screens/Profile';
import Favourite from '../../screens/Bookswapscreen/Favourite';
import Addproduct from '../../screens/Bookswapscreen/Addproduct';
import HomeS from '../../screens/Home';
import Home from '../../screens/Bookswapscreen/Home';

const Tab = createBottomTabNavigator();
const CustomTab = ({ children, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      h={70}
      w={70}
      rounded={'full'}
      shadow={7}
      bg={'#f3e8ff'}
      top={-30}>
      {children}
    </Pressable>
  );
};
const BottomNavBook = () => {
  return (
    <Tab.Navigator
      backBehavior="Home"
      initialRouteName="Home"
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
                <AntDesign name="user" size={24} color={'#ffffff'} />
              )}
            </Center>
          ),
          headerShown: false,
        }}
      />

      {/* Home */}
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <Center>
              {focused ? (
                <Entypo name="home" size={24} color={'#ffffff'} />
              ) : (
                <AntDesign name="home" size={24} color={'#ffffff'} />
              )}
            </Center>
          ),
          headerShown: false,
        }}
      />
      {/* ADD product */}
      <Tab.Screen
        name="Addproduct"
        component={Addproduct}
        options={{
          tabBarButton: props => <CustomTab {...props} />,
          tabBarIcon: ({ focused }) => (
            <Center>
              {focused ? (
                <Entypo name="plus" size={24} color={'#581c87'} />
              ) : (
                <AntDesign name="plus" size={24} color={'#581c87'} />
              )}
            </Center>
          ),
          headerShown: false,
        }}
      />
      {/*start Cart */}
      <Tab.Screen
        name="HomeS"
        component={HomeS}
        options={{
          // tabBarButton: props => <CustomTab {...props} />,
          tabBarIcon: ({ focused }) => (
            <Center>
              {focused ? (
                <Entypo name="shopping-cart" size={24} color={'#ffffff'} />
              ) : (
                <AntDesign name="shoppingcart" size={24} color={'#FFFFFF'} />
              )}
            </Center>
          ),
          headerShown: false,
        }}
      />
      {/*start Cart */}
      <Tab.Screen
        name="Favourite"
        component={Favourite}
        options={{
          // tabBarButton: props => <CustomTab {...props} />,
          tabBarIcon: ({ focused }) => (
            <Center>
              {focused ? (
                <Entypo name="shopping-cart" size={24} color={'#ffffff'} />
              ) : (
                <AntDesign name="shoppingcart" size={24} color={'#FFFFFF'} />
              )}
            </Center>
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};
export default BottomNavBook;

const styles = StyleSheet.create({
  tab: {
    elevation: 0,
    backgroundColor: '#7e22ce',
    height: 60,
  },
});
