import { updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { Button, Center, Modal, useToast } from 'native-base';
import React, { useState, useEffect } from 'react';
import {
  Image,
  View,
  Platform,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { auth, db, storage } from './DataBase/firebase';

export default function UploadImage(props) {
  const userData = props.userData;
  const [showModal, setShowModal] = useState(false);
  const [galleryPhoto, setGalleryPhoto] = useState();
  const [image, setImage] = useState('');
  const [loading, setloading] = useState(false);

  const toast = useToast();
  const user = auth.currentUser;
  const options = {
    saveToPhotos: true,
    mediaType: 'photo',
  };

  useEffect(() => {
    let isMounted = true;
    console.log('userData.key: ', userData.key);

    if (isMounted) setImage(userData.profileImage);
    return () => {
      isMounted = false;
    };
  }, [userData]);
  const openGallery = async () => {
    const result = await launchImageLibrary(options);
    if (!result.didCancel) {
      setGalleryPhoto(result.assets[0].uri);
      console.log('result', result.didCancel);
      console.log('result.assets[0].uri', result.assets[0].uri);
    }
  };
  const uploadImage = async () => {
    setloading(false);
    const response = await fetch(galleryPhoto);
    const blob = await response.blob();
    const filename = galleryPhoto.substring(galleryPhoto.lastIndexOf('/') + 1);
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
        setImage(url);
        setloading(true);

        // Insert url into an <img> tag to "download"
      });
    });
  };
  async function update_Profile() {
    //auth name change
    // await updateProfile(user, {
    //   displayName: formData.name,
    // });
    //user doc data change

    console.log('user_key: ', userData.key);
    const userkey = userData.key;
    const userDocRef = doc(db, 'user', userkey);
    await updateDoc(userDocRef, {
      profileImage: image,
    });
    setloading(false);
  }
  const addImage = () => {
    openGallery();
    if (true) {
      console.log('addImage!', galleryPhoto);

      if (loading) update_Profile();
    }
  };
  return (
    <View style={imageUploaderStyles.container}>
      {image !== '' ? (
        <Image
          source={{ uri: image }}
          alt={'image'}
          style={{ width: 200, height: 200 }}
        />
      ) : (
        <></>
      )}
      <View style={imageUploaderStyles.uploadBtnContainer}>
        {/* <TouchableOpacity
          onPress={addImage}
          style={imageUploaderStyles.uploadBtn}>
          <Text>{image ? 'Edit' : 'Upload'} Image</Text>
          <AntDesign name="camera" size={20} color={'black'} />
        </TouchableOpacity> */}
        <Center>
          <TouchableOpacity
            onPress={() => setShowModal(true)}
            style={imageUploaderStyles.uploadBtn}>
            <Text>{image ? 'Edit' : 'Upload'} Image</Text>
            <AntDesign name="camera" size={20} color={'black'} />
          </TouchableOpacity>
          <Modal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            _backdrop={{
              _dark: {
                bg: 'coolGray.800',
              },
              bg: 'warmGray.50',
            }}>
            <Modal.Content>
              <Modal.CloseButton />
              <Modal.Header>Set Profile Image</Modal.Header>
              <Modal.Body>
                {galleryPhoto && (
                  <Image
                    source={{ uri: galleryPhoto }}
                    alt={'image'}
                    style={{ width: 200, height: 200 }}
                  />
                )}
              </Modal.Body>
              <Modal.Footer>
                <Button.Group space={2}>
                  <Button
                    size={'xs'}
                    onPress={() => {
                      openGallery();
                      //setShowModal(false);
                    }}>
                    Select Image
                  </Button>
                  <Button
                    size={'xs'}
                    onPress={() => {
                      galleryPhoto
                        ? uploadImage()
                        : console.log(
                            'please select image and then upload image',
                          );

                      //setShowModal(false);
                    }}>
                    Upload Image
                  </Button>
                  <Button
                    size={'xs'}
                    onPress={() => {
                      loading ? (
                        <>{(update_Profile(), setShowModal(false))}</>
                      ) : (
                        console.log(
                          'please select image and upload image then save',
                        )
                      );
                    }}>
                    Save
                  </Button>
                </Button.Group>
              </Modal.Footer>
            </Modal.Content>
          </Modal>
        </Center>
      </View>
    </View>
  );
}
const imageUploaderStyles = StyleSheet.create({
  container: {
    elevation: 2,
    height: 200,
    width: 200,
    backgroundColor: '#efefef',
    position: 'relative',
    borderRadius: 999,
    overflow: 'hidden',
  },
  uploadBtnContainer: {
    opacity: 0.7,
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: 'lightgrey',
    width: '100%',
    height: '25%',
  },
  uploadBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
