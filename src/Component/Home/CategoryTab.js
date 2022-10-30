import * as React from 'react';
import { Text, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Content from './Content';
import { Box } from 'native-base';

function Men() {
  return (
    <Box flex={1} bg={'#f8f8ff'}>
      <Content />
    </Box>
  );
}

function Women() {
  return (
    <Box flex={1} bg={'#f8f8ff'}>
      <Content />
    </Box>
  );
}

function Child() {
  return (
    <Box flex={1} bg={'#f8f8ff'}>
      <Content />
    </Box>
  );
}

const Tab = createMaterialTopTabNavigator();

export default function CategoryTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Men" component={Men} />
      <Tab.Screen name="Women" component={Women} />
      <Tab.Screen name="Child" component={Child} />
    </Tab.Navigator>
  );
}
