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
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from './DataBase/firebase';

export default function CartItem(props) {
  const { isOpen, onOpen, onClose } = useDisclose();
  const Total = props.Total;
  const CartData = props.CartData;
  const [previewValueInStock, setpreviewValueInStock] = useState(0);

  async function getpreviewValueInStockindatabase(productid) {
    let countInStock = 0;
    const docRef = doc(db, 'shoes', productid);
    const querySnapshot = await getDoc(docRef);
    if (querySnapshot.exists()) {
      console.log(`countInStock => ${querySnapshot.data()}`);
      countInStock = querySnapshot.data().countInStock;
    } else {
      console.log('No such document!');
    }

    setpreviewValueInStock(countInStock);
  }
  async function deleteCartProduct(rowKey) {
    console.log('rowKey: ' + rowKey);

    await deleteDoc(doc(db, 'cart', rowKey));
  }
  async function udateProduct(productid, quantity) {
    getpreviewValueInStockindatabase(productid);

    console.log('previewValueInStock: ' + previewValueInStock);
    const userDocRef = doc(db, 'shoes', productid);
    await updateDoc(userDocRef, {
      countInStock: previewValueInStock + quantity,
    });
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
              {data.item.totalprice}
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
      onPress={() => {
        deleteCartProduct(data.item.key);
        udateProduct(data.item.productid, data.item.quantity);
      }}
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
          data={CartData}
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
          <DeliveryConfirmModel CartData={CartData} Total={Total} />
        </Center>
      </Box>
    </Box>
  );
}
