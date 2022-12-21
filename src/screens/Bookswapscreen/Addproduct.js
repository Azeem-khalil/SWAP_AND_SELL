import React, { useEffect, useState } from 'react';
import {
  Input,
  FormControl,
  Heading,
  Box,
  Center,
  Button,
  TextArea,
  ScrollView,
  useToast,
  Text,
} from 'native-base';
import { launchImageLibrary } from 'react-native-image-picker';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { auth, db, storage } from '../../Component/DataBase/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
const Addproduct = () => {
  const [galleryPhoto, setGalleryPhoto] = useState('');
  const [checkAddBookAd, setcheckAddBookAd] = useState(false);
  const [checkuploadImage, setuploadImage] = useState(false);
  const [loadinguploadImage, setloadinguploadImage] = useState(false);

  const toast = useToast();
  const user = auth.currentUser;

  const [formData, setData] = useState({
    BookName: '',
    description: '',
    PhoneNumber: '',
    image: '',
    location: '',
    need: '',
  });
  const [errors, setErrors] = useState({
    BookName: '',
    description: '',
    PhoneNumber: '',
    location: '',
    need: '',
    image: '',
    galleryPhoto: '',
  });

  const [currentDate, setCurrentDate] = useState('');
  const navigation = useNavigation();

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

  const openGallery = async () => {
    const result = await launchImageLibrary(options);
    if (!result.didCancel) setGalleryPhoto(result.assets[0].uri);
  };
  const validatephoneNumber = phoneNumber => {
    let re = /^923\d{9}$|^03\d{9}$/;
    return re.test(phoneNumber);
  };
  const validate = () => {
    console.log('validate!', formData.BookName);

    let returnfalse = true;
    // if (galleryPhoto === '') {
    //   setErrors({ ...errors, galleryPhoto: 'galleryPhoto is Required' });
    //   returnfalse = false;
    // }

    // if (formData.image === '') {
    //   setErrors({ ...errors, image: 'image is Required' });
    //   returnfalse = false;
    // }

    if (formData.PhoneNumber === '') {
      setErrors({ ...errors, PhoneNumber: 'PhoneNumber is required' });
      returnfalse = false;
    } else if (!validatephoneNumber(formData.PhoneNumber)) {
      setErrors({
        ...errors,
        PhoneNumber:
          'PhoneNumber should contain atleast 11 Number. 03230223234',
      });
      returnfalse = false;
    }
    if (formData.location === '') {
      setErrors({ ...errors, location: 'location is Required' });
      returnfalse = false;
    }
    if (formData.need === '') {
      setErrors({ ...errors, need: 'need is Required' });
      returnfalse = false;
    }
    if (formData.description === '') {
      setErrors({ ...errors, description: 'description is Required' });
      returnfalse = false;
    }
    if (formData.BookName === '') {
      setErrors({ ...errors, BookName: 'BookName is Required' });
      returnfalse = false;
    }
    if (returnfalse) {
      return true;
    } else {
      return false;
    }
  };
  async function Submeted() {
    setcheckAddBookAd(true);
    toast.show({
      render: () => {
        return (
          <Box bg="#ffffff" px="2" py="1" rounded="sm" mb={5}>
            Added successfully!!!
          </Box>
        );
      },
    });
    const docRef = await addDoc(collection(db, 'BooksAds'), {
      userName: user.displayName,
      uid: user.uid,
      email: user.email,
      BookName: formData.BookName,
      description: formData.description,
      need: formData.need,
      PhoneNumber: formData.PhoneNumber,
      image: formData.image,
      location: formData.location,
      adfav: false,
      date: currentDate,
    });
    setcheckAddBookAd(false);

    // {
    //   toast.show({
    //     render: () => {
    //       return (
    //         <Box bg="#ffffff" px="2" py="1" rounded="sm" mb={5}>
    //           Before add Book Ad Please Fill all Failed!!
    //         </Box>
    //       );
    //     },
    //   });
    //   return;
    // }
  }
  async function AddtoBookAd() {
    setcheckAddBookAd(true);
    if (checkuploadImage) {
      const docRef = await addDoc(collection(db, 'BooksAds'), {
        userName: user.displayName,
        uid: user.uid,
        email: user.email,
        BookName: formData.BookName,
        description: formData.description,
        need: formData.need,
        PhoneNumber: formData.PhoneNumber,
        image: formData.image,
        location: formData.location,
        adfav: false,
        date: currentDate,
      });
      toast.show({
        render: () => {
          return (
            <Box bg="#ffffff" px="2" py="1" rounded="sm" mb={5}>
              Added successfully!!!
            </Box>
          );
        },
      });
      setData({
        BookName: '',
        description: '',
        PhoneNumber: '',
        image: '',
        location: '',
        need: '',
      });
      setErrors({
        BookName: '',
        description: '',
        PhoneNumber: '',
        location: '',
        need: '',
        image: '',
        galleryPhoto: '',
      });
      setGalleryPhoto('');
      setcheckAddBookAd(false);
      setuploadImage(false);
    } else {
      toast.show({
        render: () => {
          return (
            <Box bg="#ffffff" px="2" py="1" rounded="sm" mb={5}>
              Upload Image please!!!
            </Box>
          );
        },
      });
    }
    setcheckAddBookAd(false);
  }
  const uploadImage = async () => {
    if (galleryPhoto !== '') {
      setloadinguploadImage(true);
      const response = await fetch(galleryPhoto);
      const blob = await response.blob();
      const filename = galleryPhoto.substring(
        galleryPhoto.lastIndexOf('/') + 1,
      );
      console.log('blob!', blob);

      const storageRef = ref(storage, filename);
      console.log('galleryPhoto!', galleryPhoto);
      // 'file' comes from the Blob or File API
      uploadBytes(storageRef, blob).then(snapshot => {
        console.log('snapshot!', snapshot.metadata.fullPath);
        const starsRef = ref(storage, snapshot.metadata.fullPath);

        // Get the download URL
        getDownloadURL(starsRef).then(url => {
          console.log('url! ', url);
          setData({ ...formData, image: url });

          toast.show({
            render: () => {
              return (
                <Box bg="#ffffff" px="2" py="1" rounded="sm" mb={5}>
                  Successfully Upload Image!!
                </Box>
              );
            },
          });
          setuploadImage(true);
          setloadinguploadImage(false);
          // Insert url into an <img> tag to "download"
        });
      });
    } else {
      toast.show({
        render: () => {
          return (
            <Box bg="#ffffff" px="2" py="1" rounded="sm" mb={5}>
              Before Upload Image please select image!!
            </Box>
          );
        },
      });
    }
  };
  const onSubmit = () => {
    console.log('formData ', formData);
    validate() ? AddtoBookAd() : console.log('Validation Failed');
    //validate() ? console.log('Submitted') : console.log('Validation Failed');
    // if (galleryPhoto) {
    //   AddtoBookAd();
    // }

    //navigation.goBack();
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
                value={formData.BookName}
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
              {'BookName' in errors ? (
                <Text color={'#ff0000'}>{errors.BookName}</Text>
              ) : (
                <Text></Text>
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
                value={formData.description}
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
                <Text color={'#ff0000'}> {errors.description}</Text>
              ) : (
                <Text></Text>
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
                value={formData.need}
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
                <Text color={'#ff0000'}> {errors.need}</Text>
              ) : (
                <Text></Text>
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
                value={formData.location}
                placeholder="location... "
                onChangeText={value =>
                  setData({ ...formData, location: value })
                }
                InputLeftElement={
                  <Ionicons
                    style={{ marginLeft: 5 }}
                    size={20}
                    name="location"
                  />
                }
              />
              {'location' in errors ? (
                <Text color={'#ff0000'}> {errors.location}</Text>
              ) : (
                <Text></Text>
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
                value={formData.PhoneNumber}
                type="number"
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
                <Text color={'#ff0000'}> {errors.PhoneNumber}</Text>
              ) : (
                <Text></Text>
              )}
            </FormControl>
            <TouchableOpacity onPress={openGallery} style={styles.button}>
              <Text style={styles.buttonText}>Sellect Image</Text>
            </TouchableOpacity>
            {console.log('galleryPhoto' + galleryPhoto)}
            {galleryPhoto ? (
              <Image
                style={styles.imageStyle}
                alt={'name'}
                source={{ uri: galleryPhoto }}
              />
            ) : (
              <Text></Text>
            )}
            {/* {'galleryPhoto' in errors ? (
              <Text color={'#ff0000'}> {errors.galleryPhoto}</Text>
            ) : (
              <Text></Text>
            )} */}
            <TouchableOpacity
              disabled={loadinguploadImage}
              onPress={uploadImage}
              style={styles.button}>
              <Text style={styles.buttonText}>upload Image</Text>
            </TouchableOpacity>
            {/* {'image' in errors ? (
              <Text color={'#ff0000'}> {errors.image}</Text>
            ) : (
              <Text></Text>
            )} */}
            <Button
              disabled={checkAddBookAd}
              onPress={onSubmit}
              mt="5"
              colorScheme="cyan">
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
