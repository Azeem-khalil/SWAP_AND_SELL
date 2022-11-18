import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import UploadImage from '../Component/UploadImage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Box, Button, Fab, Heading, useToast } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { signOut } from 'firebase/auth';
import { auth, db } from '../Component/DataBase/firebase';
import { useEffect } from 'react';
import {
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';

export default function Profile() {
  const navigation = useNavigation();
  const toast = useToast();
  const [userDocid, setuserDocid] = useState('');
  const [userData, setuserData] = useState([]);

  function signout() {
    signOut(auth)
      .then(() => {
        toast.show({
          render: () => {
            return (
              <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
                successfully Logout
              </Box>
            );
          },
        });
        navigation.navigate('Login');
      })
      .catch(error => {
        toast.show({
          render: () => {
            return (
              <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
                {error.message}
              </Box>
            );
          },
        });
      });
  }
  useEffect(() => {
    let isMounted = true;
    const User = auth.currentUser;

    const qc = query(collection(db, 'user'), where('email', '==', User.email));

    const unsubscribe = onSnapshot(qc, querySnapshot => {
      const User_Data = [];
      querySnapshot.forEach(doc => {
        User_Data.push({
          ...doc.data(),
          key: doc.id,
        });
        console.log('indoc:: ' + `${doc.id} => ${doc.data()}`);
        if (isMounted) setuserData(User_Data);
      });
    });
    return () => {
      isMounted = false;
    };
  }, []);
  console.log('userData:: ' + userData);

  return (
    <View>
      {userData.map(userData => (
        <View key={userData.key}>
          <View style={styles.container}>
            <Fab
              key={userData.key}
              renderInPortal={false}
              shadow={2}
              placement="top-right"
              size="sm"
              bg={'#7e22ce'}
              _pressed={{ bg: '#a78bfa' }}
              onPress={() => navigation.navigate('Edit_Profile', userData)}
              icon={<Icon size={20} color={'#ffffff'} name="account-edit" />}
            />
            <UploadImage />
            <Heading style={{ marginVertical: 20, fontSize: 16 }}>
              {userData.displayName}
            </Heading>
          </View>
          <View style={styles.userInfoSection}>
            <View style={styles.row}>
              <Icon name="map-marker-radius" color="#7e22ce" size={20} />
              <Text style={{ color: '#777777', marginLeft: 20 }}>
                {userData.address}
              </Text>
            </View>
            <View style={styles.row}>
              <Icon name="phone" color="#7e22ce" size={20} />
              <Text style={{ color: '#777777', marginLeft: 20 }}>
                {userData.phoneNumber}
              </Text>
            </View>
            <View style={styles.row}>
              <Icon name="email" color="#7e22ce" size={20} />
              <Text style={{ color: '#777777', marginLeft: 20 }}>
                {userData.email}
              </Text>
            </View>
          </View>
          <Button
            _text={{
              color: '#ffffff',
              fontWeight: 'medium',
              fontSize: 'sm',
            }}
            w={'25%'}
            h={'7%'}
            ml={5}
            mt={7}
            bgColor="#7e22ce"
            colorScheme="indigo"
            onPress={signout}>
            Logout
          </Button>
        </View>
      ))}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 50,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
});
