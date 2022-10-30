import React from 'react';
import { Box, Heading, Image } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { addDoc, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { db, firebase } from '../Component/DataBase/firebase';
import { async } from '@firebase/util';
const MainPage = () => {
  const navigation = useNavigation();
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
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      bg={'#f8f8ff'}>
      <Box bgColor={'#fb923c'} w="full" alignItems="center">
        <Heading mt={10} fontSize={40} color="white" fontStyle={'italic'}>
          SWAP & SeLL
        </Heading>
      </Box>

      <TouchableOpacity
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
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
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
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
    </Box>
  );
};

export default MainPage;
