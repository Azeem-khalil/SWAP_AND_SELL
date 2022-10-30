import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import CustomHeader from '../Component/Home/CustomHeader';
import { Box } from 'native-base';
import CategoryTab from '../Component/Home/CategoryTab';
const Home = () => {
  return (
    <Box flex={1} bg={'#f8f8ff'}>
      <CustomHeader />
      <CategoryTab />
    </Box>
  );
};

export default Home;

const styles = StyleSheet.create({});
