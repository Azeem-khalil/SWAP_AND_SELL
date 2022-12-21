import React from 'react';
import { Box, Button, Heading, Image, Text } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { ImageBackground, TouchableOpacity } from 'react-native';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import RNRestart from 'react-native-restart';

import { auth, db, firebase } from '../Component/DataBase/firebase';
import { async } from '@firebase/util';
const MainPage = props => {
  const startReload = () => RNRestart.Restart();

  const navigation = useNavigation();
  async function Getproduct() {
    console.log('press Button: ');
    try {
      const q = query(
        collection(db, 'shoes'),
        where('category', '==', 'women'),
      );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(doc => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, ' => ', doc.data());
      });
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }
  function addData() {
    console.log('doc name ' + db.app);
    setDoc(doc(db, 'books', 'LA'), {
      name: 'Los Angeles',
      state: 'CA',
      country: 'USA',
    });

    //async function _delete() {
    // await deleteDoc(doc(db, 'books', 'ai2HGbouAFmdalgPZHIg'));
    // }
    //_delete();
    console.log('datadta');
  }
  return (
    <Box flex={1} bg={'#d1d5db'}>
      {props.EmailVerified ? (
        <>
          <Box bgColor={'#e11d48'} w="full" alignItems="center">
            <Heading mt={10} fontSize={40} color="white" fontStyle={'italic'}>
              SWAP & SeLL
            </Heading>
          </Box>
          {/* <ImageBackground
            source={{
              uri: 'https://img.freepik.com/free-photo/smiling-attractive-woman-stylish-colorful-outfit-jumping-with-shopping-bags-pink-yellow-background-polo-neck-striped-mini-skirt-shopaholic-sale-fashion-summer-trend_285396-2421.jpg',
            }}
            resizeMode="cover"
            style={{
              flex: 1,
              justifyContent: 'center',
            }}> */}
          <Box
            flex={1}
            style={{ justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity
              flex={1}
              style={{
                alignItems: 'center',
                marginTop: 10,
                opacity: 0.9,
              }}
              onPress={() => navigation.navigate('BottomNavShoes')}>
              {/* <Text color={'#000000'} fontSize={25} bold fontStyle={'italic'}>
                  Book Swap
                </Text> */}
              <Image
                rounded={'lg'}
                source={{
                  uri: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=80',
                }}
                style={{ opacity: 0.9 }}
                alt={'shoes'}
                size={'2xl'}
                w={'sm'}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity
              flex={1}
              style={{ alignItems: 'center', marginTop: 20 }}
              onPress={() => navigation.navigate('BottomNavBook')}>
              {/* <Text color={'#000000'} fontSize={25} bold>
                Book Swap
              </Text> */}
              <Image
                rounded={'lg'}
                source={{
                  uri: 'https://media.istockphoto.com/id/1273544978/photo/open-book-with-pages-on-a-red-background.jpg?s=612x612&w=0&k=20&c=38NYzQmRrACHMIggxFrPMm4bdux0-sSPBYcJPMEP1rY=',
                }}
                alt={'shoes'}
                size={'2xl'}
                w={'sm'}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </Box>
          {/* </ImageBackground> */}
        </>
      ) : (
        <Box
          flex={1}
          style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Heading> Email Verification </Heading>
          <Text>Go Email:</Text>
          <Text color={'#ff0000'}> {auth.currentUser.email}</Text>
          <Text> for Verification</Text>

          <Button title="Reload" onPress={() => startReload()}>
            Reload App
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default MainPage;
