import React from 'react';
import { Box, Button, Heading, Image, Text } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
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
    <Box
      flex={1}
      style={{ justifyContent: 'center', alignItems: 'center' }}
      bg={'#f8f8ff'}>
      {props.EmailVerified ? (
        <>
          <Box bgColor={'#fb923c'} w="full" alignItems="center">
            <Heading mt={10} fontSize={40} color="white" fontStyle={'italic'}>
              SWAP & SeLL
            </Heading>
          </Box>
          <TouchableOpacity
            flex={1}
            style={{ justifyContent: 'center', alignItems: 'center' }}
            //onPress={Getproduct}
            onPress={() => navigation.navigate('BottomNavShoes')}>
            <Image
              mt={10}
              rounded={'md'}
              source={{
                uri: 'https://images.unsplash.com/photo-1549298916-f52d724204b4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
              }}
              alt={'shoes'}
              size={'2xl'}
              w={80}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity
            flex={1}
            style={{ justifyContent: 'center', alignItems: 'center' }}
            onPress={() => navigation.navigate('BottomNavBook')}>
            <Image
              mt={10}
              rounded={'md'}
              source={{
                uri: 'https://images.unsplash.com/photo-1549298916-f52d724204b4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
              }}
              alt={'shoes'}
              size={'2xl'}
              w={80}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </>
      ) : (
        <Box
          flex={1}
          style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Heading> Email Verification </Heading>
          <Text>Go Email:</Text>
          <Text color={'#ff0000'}> {auth.currentUser.email}</Text>
          <Text> for Verification</Text>

          <Button title="Reload" onPress={startReload}>
            Reload App
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default MainPage;
