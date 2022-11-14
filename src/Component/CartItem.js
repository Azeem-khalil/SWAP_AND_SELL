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
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Product from './data/Product';
import { SwipeListView } from 'react-native-swipe-list-view';
import DeliveryConfirmModel from './DeliveryConfirmModel';

export default function CartItem(props) {
  const { isOpen, onOpen, onClose } = useDisclose();
  const [Total, setTotal] = useState(0);
  //let VarTotal = 0;
  const [listData, setListData] = useState(
    Array(20)
      .fill('')
      .map((_, i) => ({ key: `${i}`, text: `item #${i}` })),
  );
  function calculateTotal(data) {
    console.log('data.item.totalprice ' + data.item.totalprice);

    let VarTotal = Total + data.item.totalprice;
    console.log('VarTotal ' + VarTotal);
    setTotal(VarTotal);
  }
  const deleteRow = (rowMap, rowKey) => {
    const newData = [...listData];
    const prevIndex = listData.findIndex(item => item.key === rowKey);
    newData.splice(prevIndex, 1);
    setListData(newData);
  };

  const renderItem = data => (
    <Pressable>
      <Box mb={3}>
        {
          //calculateTotal(data) //wrrrrrr
        }
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
          showsVerticalScrollIndicator={false}
        />
      </Box>
      {/* <Button flex="0.1" onPress={onOpen} shadow={2}>
        Actionsheet
      </Button>

      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Actionsheet.Item>
            <Box roundedTop={15} bg={'#581c87'}>
              <Center alignItems={'center'} mt={2}>
                <HStack
                  shadow={1}
                  alignItems={'center'}
                  bg={'#9333ea'}
                  rounded={20}
                  overflow="hidden"
                  h={50}>
                  <Center>
                    <Text
                      ml={5}
                      isTruncated
                      bold
                      color={'#ffffff'}
                      fontSize={20}>
                      Total Price
                    </Text>
                  </Center>
                  <Center>
                    <Text
                      ml={55}
                      mr={2}
                      isTruncated
                      bold
                      color={'#dc143c'}
                      fontSize={20}>
                      2234 .RS
                      {
                        //data.item.Name
                      }
                    </Text>
                  </Center>
                </HStack>
              </Center>
              <Center alignItems={'center'} mb={6}>
                <DeliveryConfirmModel />
              </Center>
            </Box>
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet> */}
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
                color={'#dc143c'}
                fontSize={20}>
                {
                  //Total
                }
                20 .RS
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
