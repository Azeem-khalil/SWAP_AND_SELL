import {
  Actionsheet,
  Box,
  Button,
  Center,
  HStack,
  Image,
  Pressable,
  ScrollView,
  Text,
  useDisclose,
  VStack,
} from 'native-base';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Product from './data/Product';
import { SwipeListView } from 'react-native-swipe-list-view';
import DeliveryConfirmModel from './DeliveryConfirmModel';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from './DataBase/firebase';

export default function CartItem(props) {
  const { isOpen, onOpen, onClose } = useDisclose();
  const Total = props.Total;

  async function deleteCartProduct(rowMap, rowKey) {
    console.log('key: ' + rowKey);
    await deleteDoc(doc(db, 'cart', rowKey));
  }

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
              source={{ uri: data.item.image }}
              alt={data.item.productName}
              w="full"
              h="24"
            />
          </Center>
          <VStack w={'60%'} px={2} space={2}>
            <Text ml={2} isTruncated bold color={'#000000'} fontSize={15}>
              {data.item.productName}
            </Text>
            <Text bold ml={4} fontSize={17} color={'#696969'}>
              ${data.item.totalprice}
            </Text>
          </VStack>
          <Center>
            <Button bg={'#000000'} disabled _text={{ color: '#ffffff' }}>
              {data.item.quantity}
            </Button>
          </Center>
        </HStack>
      </Box>
    </Pressable>
  );

  const renderHiddenItem = (data, rowMap) => (
    <Pressable
      onPress={() => deleteCartProduct(rowMap, data.item.key)}
      w={50}
      roundedTopRight={10}
      roundedBottomRight={10}
      h={'88%'}
      ml={'auto'}
      mr={2}
      justifyContent={'center'}
      bg={'#ef4444'}>
      <Center alignItems={'center'} space={2}>
        <FontAwesome5 name="trash" size={24} color={'#ffff'} />
      </Center>
    </Pressable>
  );
  const onRowDidOpen = rowKey => {
    console.log('This row opened', rowKey);
  };
  return (
    <Box flex={1} bg={'#ffffff'}>
      <Box mr={3} ml={3} flex={1} bg={'#ffffff'}>
        <SwipeListView
          data={props.CartData}
          rightOpenValue={-50}
          previewRowKey="0"
          previewOpenValue={-40}
          previewOpenDelay={3000}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          onRowDidOpen={onRowDidOpen}
          showsVerticalScrollIndicator={false}
        />
      </Box>

      <Box mb={0} flex={0.4} roundedTop={15} bg={'#581c87'}>
        <Center alignItems={'center'} mt={2}>
          <HStack
            shadow={1}
            alignItems={'center'}
            bg={'#9333ea'}
            rounded={20}
            overflow="hidden"
            h={50}>
            <Center>
              <Text ml={5} isTruncated bold color={'#ffffff'} fontSize={20}>
                Total Price
              </Text>
            </Center>
            <Center>
              <Text
                ml={55}
                mr={2}
                isTruncated
                bold
                color={'#000000'}
                fontSize={20}>
                {Total} .RS
              </Text>
            </Center>
          </HStack>
        </Center>
        <Center alignItems={'center'} mb={6}>
          <DeliveryConfirmModel />
        </Center>
      </Box>
    </Box>
  );
}
