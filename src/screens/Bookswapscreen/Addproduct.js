import React, { useState } from 'react';
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
const Addproduct = () => {
  const [cameraPhoto, setCameraPhoto] = useState();
  const [galleryPhoto, setGalleryPhoto] = useState();
  const [formData, setData] = React.useState({});
  const [errors, setErrors] = React.useState({});

  let options = {
    saveToPhotos: true,
    mediaType: 'photo',
  };
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

  const onSubmit = () => {
    validate() ? console.log('Submitted') : console.log('Validation Failed');
  };

  return (
    <Center flex={1} px="3" bg={'#ffffff'}>
      <Center w="100%">
        <Box safeArea p="2" py="8" w="90%" maxW="290">
          <ScrollView showsVerticalScrollIndicator={false}>
            <Heading>POST YOUR AD</Heading>
            <FormControl isRequired isInvalid={'Book Name' in errors}>
              <FormControl.Label
                _text={{
                  bold: true,
                }}>
                Book Name
              </FormControl.Label>
              <Input
                placeholder="Book..."
                onChangeText={value => setData({ ...formData, name: value })}
                InputLeftElement={
                  <FontAwesome
                    style={{ marginLeft: 5 }}
                    size={20}
                    name="book"
                  />
                }
              />
              {' Book Name' in errors ? (
                <FormControl.ErrorMessage>Error</FormControl.ErrorMessage>
              ) : (
                <FormControl.HelperText>
                  Name should contain atleast 3 character.
                </FormControl.HelperText>
              )}
            </FormControl>
            <FormControl isRequired isInvalid={'Last Name' in errors}>
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
                onChangeText={value => setData({ ...formData, name: value })}
                _focus={{ bg: '#f5f5f5' }}
              />

              {'Last Name' in errors ? (
                <FormControl.ErrorMessage>Error</FormControl.ErrorMessage>
              ) : (
                <FormControl.HelperText>
                  Last Name should contain atleast 3 character.
                </FormControl.HelperText>
              )}
            </FormControl>
            <FormControl isRequired isInvalid={'Phone Number' in errors}>
              <FormControl.Label
                _text={{
                  bold: true,
                }}>
                Phone Number
              </FormControl.Label>
              <Input
                placeholder="03230115794"
                onChangeText={value => setData({ ...formData, name: value })}
                InputLeftElement={
                  <FontAwesome
                    style={{ marginLeft: 5 }}
                    size={20}
                    name="phone"
                  />
                }
              />
              {'Phone Number' in errors ? (
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
