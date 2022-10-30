import { View, Text } from 'react-native';
import React from 'react';
import { Box, Center, Fab } from 'native-base';
import Header from '../../Component/HomeBook/Header';
import Content from '../../Component/HomeBook/Content';

const Home = () => {
  return (
    <Box flex={1} bg={'#ffffff'}>
      <Header />
      <Content />
    </Box>
  );
};

export default Home;
