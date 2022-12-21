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

  // const BooksAds = props.BooksAds;

  return (
    <Box flex={1} bg={'#f8f8ff'}>
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
                w={'full'}
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
    </Box>
  );
};

export default Content;
