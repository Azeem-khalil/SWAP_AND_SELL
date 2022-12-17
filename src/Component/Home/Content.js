import { StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  Flex,
  ScrollView,
  Image,
  Pressable,
  Box,
  Heading,
  Text,
  Button,
} from 'native-base';
import Rating from '../../Component/Rating';
import { useNavigation } from '@react-navigation/native';
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from 'firebase/firestore';
import { firebase, db } from '../DataBase/firebase';
import roduct from '../data/Product';

const Content = props => {
  const [Productd, setProduct] = useState({});
  const navigation = useNavigation();
  const product = props.ProductData;

  return (
    <Box flex={1} bg={'#f8f8ff'}>
      <Box>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Flex
            flexWrap="wrap"
            direction="row"
            justifyContent="space-between"
            px={6}>
            {product.map(product => (
              <Pressable
                onPress={() => navigation.navigate('ProductView', product)}
                key={product.key}
                w="47%"
                bg={'#ffffff'}
                rounded="md"
                pt={0.3}
                my={3}
                pb={2}
                overflow="hidden">
                <Image
                  source={{ uri: product.image1 }}
                  alt={product.name}
                  w="full"
                  h={24}
                  resizeMode="contain"
                />

                <Box px={4} pt={1}>
                  <Heading size="sm" bold>
                    RS/-{product.price}
                  </Heading>
                  <Text fontSize={12} mt={1} isTruncated w="full">
                    {product.name}
                  </Text>
                  <Rating value={product.rating} size={10} />
                </Box>
                {/* {_ListProduct} */}
              </Pressable>
            ))}
          </Flex>
        </ScrollView>
      </Box>
    </Box>
  );
};

export default Content;
