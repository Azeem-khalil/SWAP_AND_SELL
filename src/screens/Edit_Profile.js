import React, { useEffect } from 'react';
import {
  VStack,
  Button,
  FormControl,
  Input,
  Center,
  ScrollView,
  Heading,
  useToast,
  Box,
  Text,
} from 'native-base';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { auth, db } from '../Component/DataBase/firebase';
import { updateProfile } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
const Edit_Profile = ({ route }) => {
  //function Edit_Profile(route) {
  const [formData, setData] = useState({});
  const [errors, setErrors] = useState({});
  const [errorname, setErrorname] = useState();
  const [errorphoneNumber, seterrorphoneNumber] = useState('');
  const [errorAddress, seterrorAddress] = useState('');
  const [updateflage, setupdateflage] = useState(false);
  const toast = useToast();
  const navigation = useNavigation();
  const user_Data = route.params;
  const User = auth.currentUser;
  useEffect(() => {
    let isMounted = true;
    console.log('userData.key: ', user_Data.key);

    if (isMounted) setData(user_Data);
    return () => {
      isMounted = false;
    };
  }, [user_Data]);

  async function update_Profile() {
    setupdateflage(true);

    //auth name change
    await updateProfile(User, {
      displayName: formData.name,
    });
    //user doc data change

    console.log('user_key: ', user_Data.key);
    const userkey = user_Data.key;
    const userDocRef = doc(db, 'user', userkey);
    await updateDoc(userDocRef, {
      displayName: formData.displayName,
      address: formData.address,
      phoneNumber: formData.phoneNumber,
    });
    toast.show({
      render: () => {
        return (
          <Box bg="#ffffff" px="2" py="1" rounded="sm" mb={5}>
            Update successful!!!
          </Box>
        );
      },
    });
    console.log('Update sucesfu: ');
    setupdateflage(false);

    navigation.goBack();
  }
  const validatename = name => {
    let re = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]+[ ]*)*$/;
    return re.test(name);
  };
  const validatephoneNumber = phoneNumber => {
    let re = /^923\d{9}$|^03\d{9}$/;
    return re.test(phoneNumber);
  };
  const validate = () => {
    let returnfalse = true;
    if (formData.address === '') {
      seterrorAddress('Address is Required');
      returnfalse = false;
    }
    if (formData.displayName === '') {
      setErrorname('Name is Required');
      returnfalse = false;
    } else if (!validatename(formData.displayName)) {
      setErrorname('Please enter valid Name. ');
      returnfalse = false;
    } else if (formData.displayName.length < 3) {
      setErrorname('Name is too short');
      returnfalse = false;
    }
    if (formData.phoneNumber === '') {
      seterrorphoneNumber('phoneNumber is required');
      returnfalse = false;
    } else if (!validatephoneNumber(formData.phoneNumber)) {
      seterrorphoneNumber(
        'PhoneNumber should contain atleast 11 Number. 03230223234',
      );
      returnfalse = false;
    }
    if (returnfalse) {
      return true;
    } else {
      return false;
    }
  };
  const onSubmit = () => {
    //validate() ? console.log('Submitted') : console.log('Validation Failed');
    console.log('formData.name: ', formData.displayName);
    console.log('formData.Address: ', formData.address);
    console.log('formData.name: ', formData.phoneNumber);
    validate() ? update_Profile() : console.log('Validation Failed');

    // } else {
    //   toast.show({
    //     render: () => {
    //       return (
    //         <Box bg="#ffffff" px="2" py="1" rounded="sm" mb={5}>
    //           Update Not successful!!!
    //         </Box>
    //       );
    //     },
    //   });
    //   console.log('Update NT sucesfu: ');
    // }
  };

  return (
    <Center flex={1} px="3" bg={'#ffffff'}>
      <VStack width="90%" mx="3" maxW="300px">
        <ScrollView showsVerticalScrollIndicator={false}>
          <Heading mb={2}>Edit Profile</Heading>

          <FormControl isRequired isInvalid={errorname}>
            <FormControl.Label
              _text={{
                bold: true,
              }}>
              Name
            </FormControl.Label>
            <Input
              isRequired
              value={formData.displayName}
              placeholder="Azeem..."
              onChangeText={value =>
                setData({ ...formData, displayName: value })
              }
              InputLeftElement={
                <Fontisto style={{ marginLeft: 5 }} size={20} name="person" />
              }
            />
            {errorname ? (
              <Text color={'#ff0000'}>{errorname}</Text>
            ) : (
              <FormControl.HelperText>
                Name should contain atleast 3 character.
              </FormControl.HelperText>
            )}
          </FormControl>

          <FormControl isRequired isInvalid={errorphoneNumber}>
            <FormControl.Label
              _text={{
                bold: true,
              }}>
              Phone Number
            </FormControl.Label>
            <Input
              value={formData.phoneNumber}
              placeholder="03230115794"
              onChangeText={value =>
                setData({ ...formData, phoneNumber: value })
              }
              InputLeftElement={
                <FontAwesome style={{ marginLeft: 5 }} size={20} name="phone" />
              }
            />

            {errorphoneNumber ? (
              <Text color={'#ff0000'}>{errorphoneNumber}</Text>
            ) : (
              <FormControl.HelperText>like 03123456712</FormControl.HelperText>
            )}
          </FormControl>

          <FormControl isRequired isInvalid={errorAddress}>
            <FormControl.Label
              _text={{
                bold: true,
              }}>
              Address
            </FormControl.Label>
            <Input
              value={formData.address}
              placeholder="Address..."
              onChangeText={value => setData({ ...formData, address: value })}
              InputLeftElement={
                <Ionicons style={{ marginLeft: 5 }} size={20} name="location" />
              }
            />
            {errorAddress ? (
              <Text color={'#ff0000'}>{errorAddress}</Text>
            ) : (
              <FormControl.HelperText></FormControl.HelperText>
            )}
          </FormControl>

          <Button
            onPress={onSubmit}
            disabled={updateflage}
            mt="5"
            colorScheme="cyan">
            Submit
          </Button>
        </ScrollView>
      </VStack>
    </Center>
  );
};

export default Edit_Profile;
