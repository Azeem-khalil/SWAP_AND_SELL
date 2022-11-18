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
import { useNavigation } from '@react-navigation/native';

export default function FavouritIteme(props) {
  const navigation = useNavigation();
  const { isOpen, onOpen, onClose } = useDisclose();
  //const Total = props.Total;

  async function deleteCartProduct(rowMap, rowKey) {
    console.log('key: ' + rowKey);
    await deleteDoc(doc(db, 'favorite', rowKey));
  }

  const renderItem = data => (
    <Pressable
      onLongPress={() => navigation.navigate('SingleProductView', data.item)}
      // onPress={() => {
      //   const BookData = [];
      //   BookData.push({
      //     ...data.item,
      //     addfav: false,
      //   });

      //   navigation.navigate('SingleProductView', BookData);
      // }}
    >
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
              alt={data.item.BookName}
              w="full"
              h="24"
            />
          </Center>
          <VStack w={'60%'} px={2} space={2}>
            <Text ml={2} isTruncated bold color={'#000000'} fontSize={15}>
              {data.item.BookName}
            </Text>
            <Text bold ml={4} fontSize={17} color={'#696969'}>
              {/* ${data.item.totalprice} */}
            </Text>
          </VStack>
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
          data={props.FavouriteData}
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
    </Box>
  );
}
