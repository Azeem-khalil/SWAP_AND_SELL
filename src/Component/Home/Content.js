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
import Product from '../data/Product';
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

const Content = () => {
  const [ListProduct, setListProduct] = useState({});
  const navigation = useNavigation();
  const myDoc = doc(db, 'Shoes', 'dMkJFWJdOfxzwwurDgli');

  const Read = () => {
    // MARK: Reading Doc
    // You can read what ever document by changing the collection and document path here

    getDoc(myDoc)
      // Handling Promises
      .then(snapshot => {
        // MARK: Success
        if (snapshot.exists) {
          setListProduct(snapshot.data());
          console.log('id ' + snapshot.id);
        } else {
          alert('No Doc Found');
        }
      })
      .catch(error => {
        // MARK: Failure
        alert(error.message);
      });
  };

  // useEffect(() => {
  //   // declare the data fetching function
  //   const fetchData = async () => {
  //     const data = await fetch('https://yourapi.com');
  //   };

  //   // call the function
  //   fetchData()
  //     // make sure to catch any error
  //     .catch(console.error);
  // }, []);
  console.log('asd ' + ListProduct);
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {/* <Button title="Read Doc" onPress={Read}></Button> */}
      <Flex
        flexWrap="wrap"
        direction="row"
        justifyContent="space-between"
        px={6}>
        {Product.map(product => (
          <Pressable
            onPress={() => navigation.navigate('ProductView', product)}
            key={product._id}
            w="47%"
            bg={'#ffffff'}
            rounded="md"
            pt={0.3}
            my={3}
            pb={2}
            overflow="hidden">
            <Image
              source={{ uri: product.Image }}
              alt={product.Name}
              w="full"
              h={24}
              resizeMode="contain"
            />

            <Box px={4} pt={1}>
              <Heading size="sm" bold>
                ${product.price}
              </Heading>
              <Text fontSize={12} mt={1} isTruncated w="full">
                {product.Name}
              </Text>
              <Rating value={product.rating} size={10} />
            </Box>
            {/* {_ListProduct} */}
          </Pressable>
        ))}
      </Flex>
    </ScrollView>
  );
};

export default Content;
