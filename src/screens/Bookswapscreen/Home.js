import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { Box, Center, Fab } from 'native-base';
import Header from '../../Component/HomeBook/Header';
import Content from '../../Component/HomeBook/Content';
import { db } from '../../Component/DataBase/firebase';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { useState } from 'react';

const Home = () => {
  const [BooksAds, setBooksAds] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      console.log('press Button: ');

      try {
        const qc = query(collection(db, 'BooksAds'));

        const unsubscribe = await onSnapshot(qc, querySnapshot => {
          const BookData = [];
          querySnapshot.forEach(doc => {
            console.log('indoc: ' + `${doc.id} => ${doc.data()}`);
            BookData.push({
              ...doc.data(),
              key: doc.id,
            });
          });
          if (isMounted) setBooksAds(BookData);
          console.log('BookData ' + BookData);
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
    <Box flex={1} bg={'#ffffff'}>
      <Header />
      <Content BooksAds={BooksAds} />
    </Box>
  );
};

export default Home;
