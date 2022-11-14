import { StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Center,
  CheckIcon,
  FormControl,
  Heading,
  HStack,
  ScrollView,
  Select,
  Text,
  TextArea,
  useToast,
  VStack,
} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { auth, db } from './DataBase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
const WriteReview = props => {
  const [rating, setrating] = useState('');
  const [comment, setcomment] = useState('');
  const [date, setdate] = useState('');
  const [userName, setuserName] = useState('');
  const [userid, setuserid] = useState('');
  const toast = useToast();
  const product = props.productArray;
  const [currentDate, setCurrentDate] = useState('');
  function stateReset() {
    const empty = '';
    setrating(empty);
    setcomment(empty);
    setdate(empty);
  }
  useEffect(() => {
    let isMounted = true;
    console.log('in useeffect user ');
    const user = auth.currentUser;

    if (user !== null) {
      // The user object has basic properties such as display name, email, etc.
      const displayName = user.displayName;
      const uid = user.uid;
      console.log('user_name ' + displayName);
      if (isMounted) {
        setuserid(uid);
        setuserName(displayName);
      }
    }

    return () => {
      isMounted = false;
    };
  }, []);
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
  async function upadteCurrentProductReviewNum() {
    const Ref = doc(db, 'shoes', product.key);
    console.log('before numreview: ' + product.numReview);
    // Set the "capital" field of the city 'DC'
    await updateDoc(Ref, {
      numReview: 1 + product.numReview,
      rating:
        (product.star1Review +
          product.star2Review * 2 +
          product.star3Review * 3 +
          product.star4Review * 4 +
          product.star5Review * 5) /
        (1 + product.numReview), //WRk
    });
  }
  async function addproductReview() {
    console.log('press addproductReview ');
    try {
      console.log(
        ' product.key: ' +
          product.key +
          ' username: ' +
          userName +
          ' currentDate: ' +
          currentDate,
      );

      const docRef = await addDoc(collection(db, 'shoesReviews'), {
        userName: userName,
        productid: product.key,
        userid: userid,
        commment: comment,
        rating: rating,
        date: currentDate,
      });
      stateReset();
      console.log('Document written with ID: ' + docRef.id);
      console.log('Document  userid: ' + userid);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }
  function ratingValidate() {
    if (rating === '') {
      toast.show({
        render: () => {
          return (
            <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
              Before submit Please select rating
            </Box>
          );
        },
      });
      return;
    } else {
      addproductReview();
      upadteCurrentProductReviewNum();
      return;
    }
  }
  return (
    <Box mt={6}>
      <Heading fontSize={15} bold mb={4}>
        WriteReview
      </Heading>
      <VStack>
        <FormControl>
          <FormControl.Label _text={{ fontSize: '12px', fontWeight: 'bold' }}>
            Rating
          </FormControl.Label>
          <Select
            minWidth="200"
            accessibilityLabel="Choose Rating"
            placeholder="Choose Rating"
            mt="1"
            py={4}
            _selectedItem={{
              endIcon: <CheckIcon size={5} />,
            }}
            selectedValue={rating}
            onValueChange={e => setrating(e)}>
            <Select.Item label="Poor " value={1} />
            <Select.Item label="Fair" value={2} />
            <Select.Item label="Good" value={3} />
            <Select.Item label="Very Good" value={4} />
            <Select.Item label="Excellent" value={5} />
          </Select>
        </FormControl>
        <FormControl>
          <FormControl.Label _text={{ fontSize: '12px', fontWeight: 'bold' }}>
            Comment optional
          </FormControl.Label>
          <TextArea
            value={comment}
            onChangeText={e => {
              setcomment(e);
            }}
            h={20}
            w="full"
            placeholder="Add your Comment......."
            //borderWidth={0}
            //borderColor={'#f5f5f5'}
            py={4}
            _focus={{ bg: '#f5f5f5' }}
          />
          <Button
            w={'full'}
            h={60}
            mt={3}
            mb={5}
            rounded={'full'}
            bg={'#5b21b6'}
            _text={{ color: '#ffffff', fontWeight: 'bold' }}
            _pressed={{ bg: '#a78bfa' }}
            onPress={ratingValidate}>
            Submit
          </Button>
        </FormControl>
      </VStack>
    </Box>
  );
};

export default WriteReview;
