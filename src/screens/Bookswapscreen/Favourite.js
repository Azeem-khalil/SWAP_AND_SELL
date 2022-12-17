import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Box, Text, Center, Heading, Image, ScrollView } from 'native-base';

import EmptyCart from '../../Component/EmptyCart';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { auth, db } from '../../Component/DataBase/firebase';
import FavouritIteme from '../../Component/FavouritIteme';

const Favourite = () => {
  const [FavouriteData, setFavouriteData] = useState([]);
  const [flag, setflag] = useState(true);

  useEffect(() => {
    if (FavouriteData.length > 0) {
      setflag(true);
      console.log('array is NOT empty');
    }

    if (FavouriteData?.length > 0) {
      setflag(true);

      console.log('array is NOT empty');
    }

    if (FavouriteData.length === 0) {
      setflag(false);

      console.log('array is empty');
    }
  }, [FavouriteData]);
  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      console.log('press Button: ');
      const user = auth.currentUser;
      try {
        const qc = query(
          collection(db, 'favorite'),
          where('useridfav', '==', user.uid),
        );

        const unsubscribe = await onSnapshot(qc, querySnapshot => {
          const favouriteData = [];
          //let total = 0;
          querySnapshot.forEach(doc => {
            console.log('indoc: ' + `${doc.id} => ${doc.data()}`);
            //total += doc.data().totalprice;
            favouriteData.push({
              ...doc.data(),
              key: doc.id,
            });
          });
          if (isMounted) {
            setFavouriteData(favouriteData);
            //setTotal(total);
          }
          console.log('cartData ' + favouriteData);
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
          Favourite
        </Text>
      </Center>
      {console.log('FavouriteData.length: ' + FavouriteData.length)}

      {flag ? (
        <FavouritIteme FavouriteData={FavouriteData} />
      ) : (
        <EmptyCart text="Favourite" />
      )}
    </Box>
  );
};

export default Favourite;

const styles = StyleSheet.create({});
