import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Box, Text, Center, Heading, Image, ScrollView } from 'native-base';
import Product from '../Component/data/Product';
import EmptyCart from '../Component/EmptyCart';
import CartItem from '../Component/CartItem';

const Cart = () => {
  return (
    <Box flex={1} safeAreaTop bg={'#f8f8ff'}>
      <Center w={'full'} py={5}>
        <Text color={'#000000'} fontSize={25} bold>
          Cart
        </Text>
      </Center>
      {/* If cart is empty */}
      {/* <EmptyCart /> */}
      {/* item cart list */}
      <ScrollView showsVerticalScrollIndicator={false}></ScrollView>
      <CartItem />
    </Box>
  );
};

export default Cart;

const styles = StyleSheet.create({});
