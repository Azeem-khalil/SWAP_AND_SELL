import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Box, Text, Center, Heading, Image, ScrollView } from 'native-base';

import EmptyCart from '../Component/EmptyCart';
import CartItem from '../Component/CartItem';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { auth, db } from '../Component/DataBase/firebase';

const Cart = () => {
  const [CartData, setCartData] = useState([]);
  const [Total, setTotal] = useState(0);
  const [flag, setflag] = useState(true);

  useEffect(() => {
    if (CartData.length > 0) {
      setflag(true);
      console.log('array is NOT empty');
    }

    if (CartData?.length > 0) {
      setflag(true);

      console.log('array is NOT empty');
    }

    if (CartData.length === 0) {
      setflag(false);

      console.log('array is empty');
    }
  }, [CartData]);
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
          let total = 0;
          querySnapshot.forEach(doc => {
            console.log('indoc: ' + `${doc.id} => ${doc.data()}`);
            total += doc.data().totalprice;
            cartData.push({
              ...doc.data(),
              key: doc.id,
            });
          });
          if (isMounted) {
            setCartData(cartData);
            setTotal(total);
          }
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
      {console.log('CartData.length: ' + CartData.length)}

      {flag ? <CartItem CartData={CartData} Total={Total} /> : <EmptyCart />}
    </Box>
  );
};

export default Cart;

const styles = StyleSheet.create({});
