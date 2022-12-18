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
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { auth, db } from './DataBase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
const WriteReviewUserBook = props => {
  const [rating, setrating] = useState('');
  const [comment, setcomment] = useState('');
  const [date, setdate] = useState('');
  const [userName, setuserName] = useState('');
  const [userid, setuserid] = useState('');
  const [customUserid, setcustomUserid] = useState('');
  const [star1, setStar1] = useState(0);
  const [star2, setStar2] = useState(0);
  const [star3, setStar3] = useState(0);
  const [star4, setStar4] = useState(0);
  const [star5, setStar5] = useState(0);

  const toast = useToast();
  const product = props.productArray;
  const [currentDate, setCurrentDate] = useState('');
  const userauth = auth.currentUser;

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
      setCurrentDate(date + '/' + month + '/' + year);
    }
    return () => {
      isMounted = false;
    };
  }, []);
  useEffect(() => {
    let isMounted = true;
    const user = auth.currentUser;

    const fetchData = async () => {
      console.log('press Button: ', user.email);

      try {
        const qc = query(
          collection(db, 'user'),
          where('email', '==', product.email),
        );

        const unsubscribe = await onSnapshot(qc, querySnapshot => {
          querySnapshot.forEach(doc => {
            if (isMounted) {
              console.log(
                'doc.id userData.key: ' + `${doc.id} => ${doc.data().email}`,
              );
              setStar1(doc.data().star1);
              setStar2(doc.data().star2);
              setStar3(doc.data().star3);
              setStar4(doc.data().star4);
              setStar5(doc.data().star5);
              setcustomUserid(doc.id);
              console.log('userData.keyvvvv ');
            }
          });
          if (isMounted) {
            // setcustomUser(userData);
            console.log('userData.keyvvvv ');
          }
        });
      } catch (e) {
        console.error('Error userData document: ', e);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [product.email]);

  async function updateCurrentAidUserReview(star1, star2, star3, star4, star5) {
    const Ref = doc(db, 'user', customUserid);
    //console.log(' numreview: ' + numReview);
    // Set the "capital" field of the city 'DC'
    console.log('after star: ' + star1 + star2 + star3 + star4 + star5);
    const scoreTotal =
      star1 * 1 + star2 * 2 + star3 * 3 + star4 * 4 + star5 * 5;
    const responseTotal = star1 + star2 + star3 + star4 + star5;
    const scorating = scoreTotal / responseTotal;
    console.log('scoreTotal: ' + scoreTotal);
    console.log('responseTotal: ' + responseTotal);
    console.log('scorating: ' + scorating);

    await updateDoc(Ref, {
      rating: scorating,
      star1: star1,
      star2: star2,
      star3: star3,
      star4: star4,
      star5: star5,
    });
  }
  async function addproductReview() {
    console.log(
      '  userName:',
      userName,
      '  userid:',
      userauth.uid,
      '  commment:',
      comment,
      '  rating:',
      rating,
      '  date:',
      currentDate,
    );
    try {
      const docRef = await addDoc(collection(db, 'userReview'), {
        userName: userName,
        email: userauth.email,
        aidUemail: product.email,
        commment: comment,
        rating: rating,
        date: currentDate,
      });
      let star = [star1, star2, star3, star4, star5];
      if (rating === 1) {
        star[0] = star[0] + 1;
      } else if (rating === 2) {
        star[1] = star[1] + 1;
      } else if (rating === 3) {
        star[2] = star[2] + 1;
      } else if (rating === 4) {
        star[3] = star[3] + 1;
      } else if (rating === 5) {
        star[4] = star[4] + 1;
      }
      updateCurrentAidUserReview(star[0], star[1], star[2], star[3], star[4]);
      //stateReset();
      console.log('after star: ' + star[0], star[1], star[2], star[3], star[4]);

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
      //upadteCurrentProductReviewNum();
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
            h={45}
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

export default WriteReviewUserBook;
