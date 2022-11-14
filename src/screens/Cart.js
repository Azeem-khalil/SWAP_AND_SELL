import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Box, Text, Center, Heading, Image, ScrollView } from 'native-base';

import EmptyCart from '../Component/EmptyCart';
import CartItem from '../Component/CartItem';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { auth, db } from '../Component/DataBase/firebase';

const Cart = () => {
  const [CartData, setCartData] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      console.log('press Button: ');
      const user = auth.currentUser;
      try {
        const qc = query(
          collection(db, 'cart'),
          where('userid', '==', user.uid),
        );

        const unsubscribe = await onSnapshot(qc, querySnapshot => {
          const cartData = [];
          querySnapshot.forEach(doc => {
            console.log('indoc: ' + `${doc.id} => ${doc.data()}`);

            cartData.push({
              ...doc.data(),
              key: doc.id,
            });
          });
          if (isMounted) setCartData(cartData);
          console.log('cartData ' + cartData);
        });
      } catch (e) {
        console.error('Error adding document: ', e);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);
  return (
    <Box flex={1} safeAreaTop bg={'#f8f8ff'}>
      <Center h={20} py={5} bgColor={'#f8f8ff'}>
        <Text color={'#000000'} fontSize={25} bold>
          Cart
        </Text>
      </Center>
      {/* If cart is empty */}

      {CartData ? <CartItem CartData={CartData} /> : <EmptyCart />}
    </Box>
  );
};

export default Cart;

const styles = StyleSheet.create({});
