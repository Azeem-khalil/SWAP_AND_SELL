import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Box, Button, Center, Text } from 'native-base';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const EmptyCart = () => {
  return (
    <Box flex={1}>
      <Center h="100%">
        <Center h={200} w={200} bg={'#ffffff'} rounded="full">
          <FontAwesome5 name="shopping-basket" size={64} color={'#000000'} />
        </Center>
        <Text bold fontSize={21} mt={3}>
          Cart is Empty
        </Text>
        <Button
          h={'8%'}
          w={'80%'}
          mt={70}
          rounded={'full'}
          bg={'#000000'}
          _text={{ color: '#ffffff', fontWeight: 'bold' }}
          _pressed={{ bg: '#dcdcdc' }}>
          Start Shopping
        </Button>
      </Center>
    </Box>
  );
};

export default EmptyCart;

const styles = StyleSheet.create({});
