import {
  Box,
  Button,
  Center,
  HStack,
  Image,
  Pressable,
  Text,
  VStack,
} from 'native-base';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Product from './data/Product';
import { SwipeListView } from 'react-native-swipe-list-view';
import DeliveryConfirmModel from './DeliveryConfirmModel';

export default function CartItem() {
  const [listData, setListData] = useState(
    Array(20)
      .fill('')
      .map((_, i) => ({ key: `${i}`, text: `item #${i}` })),
  );

  const deleteRow = (rowMap, rowKey) => {
    const newData = [...listData];
    const prevIndex = listData.findIndex(item => item.key === rowKey);
    newData.splice(prevIndex, 1);
    setListData(newData);
  };

  const renderItem = data => (
    <Pressable>
      <Box mb={3}>
        <HStack
          alignItems={'center'}
          shadow={1}
          bg={'#ffff'}
          rounded={10}
          overflow="hidden">
          <Center w="30%" bg={'#dcdcdc'}>
            <Image
              source={{ uri: data.item.Image }}
              alt={data.item.Name}
              w="full"
              h="24"
            />
          </Center>
          <VStack w={'60%'} px={2} space={2}>
            <Text ml={2} isTruncated bold color={'#000000'} fontSize={15}>
              {data.item.Name}
            </Text>
            <Text bold ml={4} fontSize={17} color={'#696969'}>
              ${data.item.price}
            </Text>
          </VStack>
          <Center>
            <Button bg={'#000000'} _text={{ color: '#ffffff' }}>
              5
            </Button>
          </Center>
        </HStack>
      </Box>
    </Pressable>
  );

  const renderHiddenItem = (data, rowMap) => (
    <Pressable
      w={50}
      roundedTopRight={10}
      roundedBottomRight={10}
      h={'88%'}
      ml={'auto'}
      mr={2}
      justifyContent={'center'}
      bg={'#ff0000'}>
      <Center alignItems={'center'} space={2}>
        <FontAwesome5 name="trash" size={24} color={'#ffff'} />
      </Center>
    </Pressable>
  );

  return (
    <Box>
      <Box mr={3} ml={3}>
        <SwipeListView
          data={Product.slice(0, 1)}
          rightOpenValue={-50}
          previewRowKey="0"
          previewOpenValue={-40}
          previewOpenDelay={3000}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          showsVerticalScrollIndicator={false}
        />
      </Box>
      <Box mt={3}>
        <Center alignItems={'center'}>
          <DeliveryConfirmModel />
        </Center>
      </Box>
    </Box>
  );
}
