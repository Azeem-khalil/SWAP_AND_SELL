import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Center,
  CheckIcon,
  FormControl,
  Heading,
  HStack,
  Image,
  ScrollView,
  Select,
  Spacer,
} from 'native-base';
import { Rating } from 'react-native-ratings';
import NumericInput from 'react-native-numeric-input';
import Review from '../Component/Review';
import WriteReview from '../Component/WriteReview';
import { useNavigation } from '@react-navigation/native';
import SwipSlider from '../Component/SwipSlider';

const ProductView = ({ route }) => {
  const reviewArray = [
    {
      _id: 1,
      name: 'Balaj',
      ReviewRate: 3,
      date: 'Jan 12 2020',
      message:
        ' PS C:UsersAZEEMSWAP_AND_SELL react-native run-android info Running jetifier',
    },
    {
      _id: 4,
      name: 'azeem',
      ReviewRate: 1,
      date: 'Jan 12 2020',
      message:
        ' PS C:UsersAZEEMSWAP_AND_SELL react-native run-android info Running jetifier',
    },
    {
      _id: 2,
      name: 'mubeen',
      ReviewRate: 5,
      date: 'Jan 12 2020',
      message:
        ' PS C:UsersAZEEMSWAP_AND_SELL react-native run-android info Running jetifier',
    },
  ];
  const [size, setsize] = useState('');
  const navigation = useNavigation();
  const product = route.params;

  return (
    <Box safeArea flex={1} bg={'#ffffff'}>
      <SwipSlider Image={product.Image} />
      <Box safeArea flex={1} bg={'#ffffff'}>
        <ScrollView px={5} showsVerticalScrollIndicator={false}>
          <Heading fontSize={20} bold mt={3} mb={2} lineHeight={22}>
            {product.Name}
          </Heading>
          <Box>
            <HStack space={0.4} mt={1} alignItems="center">
              <Rating
                ratingCount={5}
                imageSize={10}
                startingValue={product.rating}
              />
            </HStack>
          </Box>

          <Box>
            <HStack space={2} mY={5} mt={4} alignItems="center">
              <NumericInput
                // value={this.state.value}
                onChange={value => console.log(value)}
                totalWidth={140}
                totalHeight={35}
                iconSize={25}
                step={1}
                valueType="real"
                rounded
                maxValue={product.countInStock}
                minValue={0}
                textColor="#ff0000"
                iconStyle={{ color: '#000000' }}
                rightButtonBackgroundColor="#dcdcdc"
                leftButtonBackgroundColor="#dcdcdc"
              />
              <Spacer />
              <Heading bold color="#000000" fontSize={19}>
                ${product.price}
              </Heading>
            </HStack>
            {/* <FormControl>
            <FormControl.Label _text={{ fontSize: '12px', fontWeight: 'bold' }}>
              size
            </FormControl.Label>
            <Select
              minWidth="00"
              accessibilityLabel="Choose size"
              placeholder="Choose size"
              mt="1"
              py={4}
              _selectedItem={{
                endIcon: <CheckIcon size={5} />,
              }}
              selectedValue={size}
              onValueChange={e => setsize(e)}>
              <Select.Item label="6 " value={1} />
              <Select.Item label="8" value={2} />
              <Select.Item label="10" value={3} />
              <Select.Item label="11" value={4} />
            </Select>
          </FormControl> */}
            <Text fontSize={12} lineHeight={24}>
              PS C:\Users\AZEEM\SWAP_AND_SELL react-native run-android info
              Running jetifier to migrate libraries to AndroidX. You can disable
              it using "--no-jetifier" flag. (node:8364) Warning: Accessing
              non-existent property 'padLevels' of module exports inside
              circular
            </Text>
            <Button
              borderRadius="full"
              mt={10}
              color="#ffffff"
              bg="#5b21b6"
              _pressed={{ bg: '#a78bfa' }}
              onPress={() => navigation.navigate('Cart')}>
              ADD TO CADR
            </Button>

            <Review reviewArray={reviewArray} />

            <WriteReview />
          </Box>
        </ScrollView>
      </Box>
    </Box>
  );
};

export default ProductView;

const styles = StyleSheet.create({});
