import React from 'react';
import {
  Box,
  FlatList,
  Heading,
  Avatar,
  HStack,
  VStack,
  Text,
  Spacer,
  Center,
  NativeBaseProvider,
  Pressable,
  Fab,
  ZStack,
} from 'native-base';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useState } from 'react';
import { useEffect } from 'react';

const Content = props => {
  const navigation = useNavigation();

  const data = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      fullName: 'Aafreen Khan',
      timeStamp: '12:47 PM',
      recentText: 'Good Day!',
      avatarUrl:
        'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      fullName: 'Sujitha Mathur',
      timeStamp: '11:11 PM',
      recentText: 'Cheer up, there!',
      avatarUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEaZqT3fHeNrPGcnjLLX1v_W4mvBlgpwxnA&usqp=CAU',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      fullName: 'Anci Barroco',
      timeStamp: '6:22 PM',
      recentText: 'Good Day!',
      avatarUrl: 'https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg',
    },
    {
      id: '68694a0f-3da1-431f-bd56-142371e29d72',
      fullName: 'Aniket Kumar',
      timeStamp: '8:56 PM',
      recentText: 'All the best',
      avatarUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr01zI37DYuR8bMV5exWQBSw28C1v_71CAh8d7GP1mplcmTgQA6Q66Oo--QedAN1B4E1k&usqp=CAU',
    },
    {
      id: '28694a0f-3da1-471f-bd96',
      fullName: 'Kiara',
      timeStamp: '12:47 PM',
      recentText: 'I will call today.',
      avatarUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU',
    },

    {
      id: '28694a0f-3da1-471f-bd96-1424',
      fullName: 'Kiara',
      timeStamp: '12:47 PM',
      recentText: 'I will call today.',
      avatarUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU',
    },

    {
      id: '28694a0f-3da1-471f-bd96-142456',
      fullName: 'Kiara',
      timeStamp: '12:47 PM',
      recentText: 'I will call today.',
      avatarUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU',
    },

    {
      id: '28694a0f-3da1-471f-bd96-142456e',
      fullName: 'Kiara',
      timeStamp: '12:47 PM',
      recentText: 'I will call today.',
      avatarUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU',
    },

    {
      id: '28694a0f-3da1-471f-bd96-142456e2',
      fullName: 'Kiara',
      timeStamp: '12:47 PM',
      recentText: 'I will call today.',
      avatarUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU',
    },

    {
      id: '28694a0f-3da1-471f-bd96-142456e29',
      fullName: 'Kiara',
      timeStamp: '12:47 PM',
      recentText: 'I will call today.',
      avatarUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU',
    },

    {
      id: '28694a0f-3da1-471f-bd96-142456e29d',
      fullName: 'Kiara',
      timeStamp: '12:47 PM',
      recentText: 'I will call today.',
      avatarUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU',
    },

    {
      id: '28694a0f-3da1-471f-bd96-142456e29d7',
      fullName: 'Kiara',
      timeStamp: '12:47 PM',
      recentText: 'I will call today.',
      avatarUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU',
    },
  ];

  // const BooksAds = props.BooksAds;

  return (
    <Center>
      <Box w="full">
        <FlatList
          data={props.BooksAds}
          renderItem={({ item }) => (
            <Pressable
              key={item.key}
              onPress={() => navigation.navigate('SingleProductView', item)}
              rounded="8"
              overflow="hidden"
              borderWidth="1"
              borderColor="coolGray.300"
              maxW="96"
              shadow="3"
              bg="coolGray.100"
              p="5">
              <Box
                _dark={{
                  borderColor: 'muted.50',
                }}
                borderColor="muted.800"
                pl={['0', '4']}
                pr={['0', '5']}
                py="2">
                <HStack space={[2, 3]} justifyContent="space-between">
                  <Avatar
                    size="48px"
                    source={{
                      uri: item.image,
                    }}
                  />
                  <VStack>
                    <Text
                      _dark={{
                        color: 'warmGray.50',
                      }}
                      color="coolGray.800"
                      bold>
                      {item.BookName}
                    </Text>
                    <Text
                      color="coolGray.600"
                      _dark={{
                        color: 'warmGray.200',
                      }}>
                      {item.need}
                    </Text>
                  </VStack>
                  <Spacer />
                  <Text
                    fontSize="xs"
                    _dark={{
                      color: 'warmGray.50',
                    }}
                    color="coolGray.800"
                    alignSelf="flex-start">
                    {item.date}
                  </Text>
                </HStack>
              </Box>
            </Pressable>
          )}
          keyExtractor={item => item.key}
        />
      </Box>
    </Center>
  );
};

export default Content;
