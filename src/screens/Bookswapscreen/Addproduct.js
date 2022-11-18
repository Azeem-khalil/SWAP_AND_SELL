import React, { useEffect, useState } from 'react';
import {
  VStack,
  Input,
  Stack,
  FormControl,
  Heading,
  Box,
  Center,
  Button,
  TextArea,
  ScrollView,
  useToast,
} from 'native-base';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { auth, db } from '../../Component/DataBase/firebase';
import { addDoc, collection } from 'firebase/firestore';
const Addproduct = () => {
  const [cameraPhoto, setCameraPhoto] = useState();
  const [galleryPhoto, setGalleryPhoto] = useState();
  const [checkAddBookAd, setcheckAddBookAd] = useState(true);
  const toast = useToast();
  const user = auth.currentUser;

  const [formData, setData] = useState({});
  const [errors, setErrors] = useState({});
  const [currentDate, setCurrentDate] = useState('');

  const options = {
    saveToPhotos: true,
    mediaType: 'photo',
  };

  useEffect(() => {
    let isMounted = true;
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    if (isMounted) {
      setCurrentDate(
        date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec,
      );
    }
    return () => {
      isMounted = false;
    };
  }, []);
  const openCamera = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const result = await launchCamera(options);
        setCameraPhoto(result.assets[0].uri);
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const openGallery = async () => {
    const result = await launchImageLibrary(options);
    setGalleryPhoto(result.assets[0].uri);
  };

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
  async function AddtoBookAd() {
    if (
      (checkAddBookAd &&
        !formData.BookName == '' &&
        !formData.description == '' &&
        !formData.PhoneNumber == '' &&
        !formData.location == '') ||
      !formData.need == ''
    ) {
      setcheckAddBookAd(false);
      const docRef = await addDoc(collection(db, 'BooksAds'), {
        userName: user.displayName,
        uid: user.uid,
        BookName: formData.BookName,
        description: formData.description,
        need: formData.need,
        PhoneNumber: formData.PhoneNumber,
        image:
          'https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
        location: formData.location,
        rating: 2,
        numReview: 6,
        afav: false,
        date: currentDate,
      });
      setcheckAddBookAd(true);
      // navigation.navigate('Cart');
    } else {
      toast.show({
        render: () => {
          return (
            <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
              Before add Book Ad Please select quantity
            </Box>
          );
        },
      });
      return;
    }
  }
  const onSubmit = () => {
    console.log('formData ', formData);
    //validate() ? console.log('Submitted') : console.log('Validation Failed');

    AddtoBookAd();
  };

  return (
    <Center flex={1} px="3" bg={'#ffffff'}>
      <Center w="100%">
        <Box safeArea p="2" py="8" w="90%" maxW="290">
          <ScrollView showsVerticalScrollIndicator={false}>
            <Heading>POST YOUR AD</Heading>
            <FormControl isRequired isInvalid={'BookName' in errors}>
              <FormControl.Label
                _text={{
                  bold: true,
                }}>
                Book Name
              </FormControl.Label>
              <Input
                placeholder="Book..."
                onChangeText={value =>
                  setData({ ...formData, BookName: value })
                }
                InputLeftElement={
                  <FontAwesome
                    style={{ marginLeft: 5 }}
                    size={20}
                    name="book"
                  />
                }
              />
              {' BookName' in errors ? (
                <FormControl.ErrorMessage>Error</FormControl.ErrorMessage>
              ) : (
                <FormControl.HelperText>
                  Name should contain atleast 3 character.
                </FormControl.HelperText>
              )}
            </FormControl>
            <FormControl isRequired isInvalid={'description' in errors}>
              <FormControl.Label
                _text={{
                  bold: true,
                }}>
                Add description
              </FormControl.Label>
              <TextArea
                h={20}
                w="full"
                placeholder="Add your Comment......."
                //borderWidth={1}
                // borderColor={'#000000'}
                //bgColor={'#000000'}
                py={4}
                onChangeText={value =>
                  setData({ ...formData, description: value })
                }
                _focus={{ bg: '#f5f5f5' }}
              />

              {'description' in errors ? (
                <FormControl.ErrorMessage>Error</FormControl.ErrorMessage>
              ) : (
                <FormControl.HelperText>
                  Last Name should contain atleast 3 character.
                </FormControl.HelperText>
              )}
            </FormControl>
            <FormControl isRequired isInvalid={'need' in errors}>
              <FormControl.Label
                _text={{
                  bold: true,
                }}>
                your need
              </FormControl.Label>
              <TextArea
                h={20}
                w="full"
                placeholder="Add your need......."
                //borderWidth={1}
                // borderColor={'#000000'}
                //bgColor={'#000000'}
                py={4}
                onChangeText={value => setData({ ...formData, need: value })}
                _focus={{ bg: '#f5f5f5' }}
              />

              {'need' in errors ? (
                <FormControl.ErrorMessage>Error</FormControl.ErrorMessage>
              ) : (
                <FormControl.HelperText>
                  need should contain atleast 3 character.
                </FormControl.HelperText>
              )}
            </FormControl>
            <FormControl isRequired isInvalid={'location' in errors}>
              <FormControl.Label
                _text={{
                  bold: true,
                }}>
                location
              </FormControl.Label>
              <Input
                placeholder="location... "
                onChangeText={value =>
                  setData({ ...formData, location: value })
                }
                InputLeftElement={
                  <FontAwesome
                    style={{ marginLeft: 5 }}
                    size={20}
                    name="phone"
                  />
                }
              />
              {'location' in errors ? (
                <FormControl.ErrorMessage>Error</FormControl.ErrorMessage>
              ) : (
                <FormControl.HelperText>
                  location should contain atleast 3 character.
                </FormControl.HelperText>
              )}
            </FormControl>
            <FormControl isRequired isInvalid={'PhoneNumber' in errors}>
              <FormControl.Label
                _text={{
                  bold: true,
                }}>
                PhoneNumber
              </FormControl.Label>
              <Input
                placeholder="PhoneNumber..."
                onChangeText={value =>
                  setData({ ...formData, PhoneNumber: value })
                }
                InputLeftElement={
                  <FontAwesome
                    style={{ marginLeft: 5 }}
                    size={20}
                    name="phone"
                  />
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
            <TouchableOpacity onPress={openGallery} style={styles.button}>
              <Text style={styles.buttonText}>Open Gallery</Text>
            </TouchableOpacity>
            {console.log('galleryPhoto' + galleryPhoto)}
            {<Image style={styles.imageStyle} source={{ uri: galleryPhoto }} />}

            <Button onPress={onSubmit} mt="5" colorScheme="cyan">
              Submit
            </Button>
          </ScrollView>
        </Box>
      </Center>
    </Center>
  );
};

export default Addproduct;
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ebebeb',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#233f49',
    paddingHorizontal: 50,
    paddingVertical: 10,
    marginTop: 50,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    color: '#ebebeb',
    fontWeight: 'bold',
  },
  imageStyle: {
    height: 150,
    width: 150,
    marginTop: 20,
    borderRadius: 5,
  },
});
