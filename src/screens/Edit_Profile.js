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
const Edit_Profile = ({ route }) => {
  //function Edit_Profile(route) {
  const [formData, setData] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [updateflage, setupdateflage] = React.useState(false);
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

  const validate = () => {
    if (formData.name === undefined) {
      setErrors({ ...errors, name: 'Name is required' });
      return false;
    } else if (formData.name.length < 3) {
      setErrors({ ...errors, name: 'Name is too short' });
      return false;
    }

    return true;
  };
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
  }

  const onSubmit = () => {
    //validate() ? console.log('Submitted') : console.log('Validation Failed');
    console.log('formData.name: ', formData.displayName);
    console.log('formData.Address: ', formData.address);
    console.log('formData.name: ', formData.phoneNumber);

    update_Profile();
    //console.log('update_Profile flage: ', updateflage);

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
    navigation.goBack();
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

          <FormControl isRequired isInvalid={'name' in errors}>
            <FormControl.Label
              _text={{
                bold: true,
              }}>
              Name
            </FormControl.Label>
            <Input
              value={formData.displayName}
              placeholder="Azeem..."
              onChangeText={value =>
                setData({ ...formData, displayName: value })
              }
              InputLeftElement={
                <Fontisto style={{ marginLeft: 5 }} size={20} name="person" />
              }
            />
            {'name' in errors ? (
              <FormControl.ErrorMessage>Error</FormControl.ErrorMessage>
            ) : (
              <FormControl.HelperText>
                Name should contain atleast 3 character.
              </FormControl.HelperText>
            )}
          </FormControl>

          <FormControl isRequired isInvalid={'PhoneNumber' in errors}>
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
            {'PhoneNumber' in errors ? (
              <FormControl.ErrorMessage>Error</FormControl.ErrorMessage>
            ) : (
              <FormControl.HelperText>
                Phone Number should contain atleast 3 character.
              </FormControl.HelperText>
            )}
          </FormControl>

          <FormControl isRequired isInvalid={'Address' in errors}>
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
            {'Address' in errors ? (
              <FormControl.ErrorMessage>Error</FormControl.ErrorMessage>
            ) : (
              <FormControl.HelperText>
                Address should contain atleast 3 character.
              </FormControl.HelperText>
            )}
          </FormControl>

          <Button onPress={onSubmit} mt="5" colorScheme="cyan">
            Submit
          </Button>
        </ScrollView>
      </VStack>
    </Center>
  );
};

export default Edit_Profile;
