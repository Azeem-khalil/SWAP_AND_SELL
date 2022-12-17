import { View, Text, Pressable } from 'react-native';
import React, { useEffect } from 'react';
import { Box, Center, HStack, Fab, Input } from 'native-base';
import Header from '../../Component/HomeBook/Header';
import Content from '../../Component/HomeBook/Content';
import { db } from '../../Component/DataBase/firebase';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { useState } from 'react';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Octicons';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const [BooksAds, setBooksAds] = useState([]);
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [search, setSearch] = useState('');
  const navigation = useNavigation();
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
          if (isMounted) {
            setBooksAds(BookData);
            setFilteredDataSource(BookData);
          }
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
  const searchFilterFunction = text => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = BooksAds.filter(function (item) {
        // Applying filter for the inserted text in search bar
        const itemData =
          (item.BookName ? item.BookName.toUpperCase() : ''.toUpperCase()) +
          (item.need ? item.need.toUpperCase() : ''.toUpperCase()) +
          (item.need ? item.date.toUpperCase() : ''.toUpperCase());
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(BooksAds);
      setSearch(text);
    }
  };
  return (
    <Box flex={1} bg={'#ffffff'}>
      {/* {<Header filteredDataSource={filteredDataSource} />} */}
      <Box>
        <HStack
          space={3}
          width={'full'}
          px={6}
          py={4}
          bg={'#7e22ce'}
          alignItems={'center'}
          safeArea>
          <Input
            placeholder="Name, Need, Date...."
            onChangeText={text => searchFilterFunction(text)}
            value={search}
            w="90%"
            bg={'#ffffff'}
            type="search"
            variant={'filled'}
            borderRadius="3xl"
            _focus={{ bg: '#ffffff' }}
            fontSize={12}
            InputLeftElement={
              <EvilIcons style={{ marginLeft: 5 }} size={20} name="search" />
            }
          />
          <Pressable ml={3} onPress={() => navigation.navigate('Favourite')}>
            <Ionicons name="heart" color={'#ffffff'} size={24} />
            <Box
              px={1}
              rounded={'full'}
              position={'absolute'}
              top={-13}
              left={2}
              bg={'#ff0000'}
              _text={{ color: '#ffffff', fontSize: '11px' }}>
              5
            </Box>
          </Pressable>
        </HStack>
      </Box>
      <Content BooksAds={filteredDataSource} />
    </Box>
  );
};

export default Home;
