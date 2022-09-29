import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Box, Center, Heading, HStack, Image, ScrollView } from 'native-base';
import { Rating } from 'react-native-ratings';
import NumericInput from 'react-native-numeric-input';
const ProductView = () => {
  return (
    <Box safeArea flex={1} bg={'#ffffff'}>
      <ScrollView px={5} showsVerticalScrollIndicator={false}>
        <Image
          source={require('../assets/shoes/shoes-17770.png')}
          alt={'product.Name'}
          w="full"
          h={300}
          resizeMode="contain"
        />
        <Heading fontSize={15} bold mb={2} lineHeight={22}>
          New Adidas shoes qwed
        </Heading>
        <Box>
          <HStack space={0.4} mt={1} alignItems="center">
            <Rating ratingCount={5} imageSize={15} startingValue={5} />
          </HStack>
        </Box>
        <HStack space={2} mY={5} alignItems="center">
          <NumericInput
            onChange={value => console.log(value)}
            totalWidth={140}
            totalHeight={30}
            iconSize={25}
            step={1}
            valueType="real"
            rounded
            textColor="#B0228C"
            iconStyle={{ color: 'white' }}
            rightButtonBackgroundColor="#EA3788"
            leftButtonBackgroundColor="#E56B70"
          />
        </HStack>
      </ScrollView>
    </Box>
  );
};

export default ProductView;

const styles = StyleSheet.create({});
