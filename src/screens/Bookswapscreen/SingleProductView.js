import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Center,
  CheckIcon,
  FormControl,
  Heading,
  HStack,
  Text,
  Image,
  ScrollView,
  Select,
  Spacer,
  useToast,
} from 'native-base';
import { Rating } from 'react-native-ratings';
import NumericInput from 'react-native-numeric-input';
import ReviewUserBook from '../../Component/ReviewUserBook';
import WriteReviewUserBook from '../../Component/WriteReviewUserBook';

import { useNavigation } from '@react-navigation/native';
import SwipSlider from '../../Component/SwipSlider';

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { async } from '@firebase/util';
import { auth, db } from '../../Component/DataBase/firebase';

const SingleProductView = ({ route }) => {
  const [size, setsize] = useState('');
  const [checkReview, setcheckReview] = useState(false);
  const [flagFavorite, setflagFavorite] = useState(true);
  const [flagdelete, setflagdelete] = useState(true);

  const [checkFavorite, setcheckFavorite] = useState(false);
  const [checkFavoriteback, setcheckFavoriteback] = useState(true);
  const [checkForDeleteAuthorizedUser, setcheckForDeleteAuthorizedUser] =
    useState(false);
  const [currentDate, setCurrentDate] = useState('');
  const [quantity, setquantity] = useState('');
  //const [Customuserid, setCustomuserid] = useState('');

  const toast = useToast();
  const navigation = useNavigation();
  const product = route.params;
  const user = auth.currentUser;
  const [reviewdata, setreviewdata] = useState([]);
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
  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      console.log('press Button: ');

      try {
        const qc = query(
          collection(db, 'userReview'),
          where('aidUemail', '==', product.email),
        );

        const unsubscribe = await onSnapshot(qc, querySnapshot => {
          const reviewuserData = [];
          querySnapshot.forEach(doc => {
            console.log(
              'reviewuserData doc.id: ' + `${doc.id} => ${doc.data()}`,
            );

            reviewuserData.push({
              ...doc.data(),
              key: doc.id,
            });
          });
          if (isMounted) setreviewdata(reviewuserData);
          console.log('reviewuserData: ' + reviewuserData);
        });
      } catch (e) {
        console.error('Error review document: ', e);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [product.email]);
  async function deleteAction(key) {
    deleteDoc(doc(db, 'BooksAds', key));
    const qc = query(
      collection(db, 'favorite'),
      where('BooksAdsid', '==', product.key),
    );

    const unsubscribe = onSnapshot(qc, querySnapshot => {
      const BookData = [];
      querySnapshot.forEach(doc => {
        console.log('favorite deleteDoc id ' + doc.id);
        BookData.push({
          key: doc.id,
        });
      });
      for (let i = 0; i < BookData.length; i++) {
        console.log('favorite BookData[i].key ' + BookData[i].key);
        const userDocRef = doc(db, 'favorite', BookData[i].key);
        updateDoc(userDocRef, {
          deleteAction: true,
        });
        //deleteDoc(doc(db, 'favorite', BookData[i].key));
      }
    });
  }
  function checkForDeleteAuthorizedUserDatabase() {
    //setflagdelete(false);
    console.log('checkForDeleteAuthorizedUser Button: ' + user.uid);
    try {
      const qc = query(
        collection(db, 'BooksAds'),
        where('uid', '==', user.uid),
      );

      const unsubscribe = onSnapshot(qc, querySnapshot => {
        var Data = false;
        querySnapshot.forEach(doc => {
          console.log('checkForDeleteAuthorizedUser data ' + doc.id);
          if (doc.id == product.key) Data = true;
        });
        setcheckForDeleteAuthorizedUser(Data);

        console.log('Data ' + Data);
      });
    } catch (e) {
      console.error('Error adding document: ', e);
    }
    //setflagdelete(true);
  }
  function checkDelteFun(key) {
    console.log('checkAuthorizedUser: ', checkForDeleteAuthorizedUser);
    checkForDeleteAuthorizedUserDatabase();

    if (checkForDeleteAuthorizedUser) {
      return (
        <Button
          borderRadius="full"
          mt={10}
          color="#ffffff"
          bg="#5b21b6"
          _pressed={{ bg: '#a78bfa' }}
          onPress={() => {
            deleteAction(key);
            navigation.goBack();
          }}
          disabled={!flagdelete}>
          DELETE AD
        </Button>
      );
    } else {
      return (
        <Button
          borderRadius="full"
          mt={10}
          color="#ffffff"
          bg="#d8b4fe"
          disabled={true}>
          DELETE AD
        </Button>
      );
    }
  }
  function checkFavDatabase() {
    console.log('checkReviewdatabase Button: ');

    try {
      const qc = query(
        collection(db, 'favorite'),
        where('BooksAdsid', '==', product.key),
        where('useridfav', '==', user.uid),
      );

      const unsubscribe = onSnapshot(qc, querySnapshot => {
        var Data = false;
        querySnapshot.forEach(doc => {
          console.log('checkfavdata data ' + doc.id);
          Data = true;
        });
        setcheckFavorite(Data);
        //setcheckFavoriteback(product.addfav);
        console.log('Data ' + Data);
      });
    } catch (e) {
      console.error('Error checkfavdata document: ', e);
    }
  }

  function checkFavoritefun() {
    checkFavDatabase();

    if (!product.adfav) {
      console.log('Error adding document: ', !product.adfav);
      console.log('checkFavorite  document: ', !checkFavorite);

      if (!checkFavorite) {
        return (
          <Button
            borderRadius="full"
            mt={10}
            color="#ffffff"
            bg="#5b21b6"
            _pressed={{ bg: '#a78bfa' }}
            onPress={ADDtoFavorite}
            disabled={!flagFavorite}>
            ADD TO Favorite
          </Button>
        );
      }
    }
  }
  async function ADDtoFavorite() {
    //if (checkCart && user && (!quantity == '' || !quantity == 0)) {
    setflagFavorite(false);
    const docRef = await addDoc(collection(db, 'favorite'), {
      BooksAdsid: product.key,
      BookName: product.BookName,
      email: product.email,
      description: product.description,
      need: product.need,
      PhoneNumber: product.PhoneNumber,
      image: product.image,
      location: product.location,
      useridfav: user.uid,
      uid: product.uid,
      adfav: true,
      deleteAction: false,
      // uid: product.uid,
    });
    //upadteCurrentProductCountInStock();
    setflagFavorite(true);
    navigation.navigate('Favourite');
  }

  // useEffect(() => {
  //   let isMounted = true;
  //   const user = auth.currentUser;

  //   const fetchData = async () => {
  //     console.log('press Button: ', user.email);

  //     try {
  //       const qc = query(
  //         collection(db, 'user'),
  //         where('email', '==', user.email),
  //       );

  //       const unsubscribe = await onSnapshot(qc, querySnapshot => {
  //         const userData = [];
  //         querySnapshot.forEach(doc => {
  //           console.log(
  //             'doc.id userData.key: ' + `${doc.id} => ${doc.data().email}`,
  //           );

  //           userData.push({
  //             ...doc.data(),
  //             key: doc.id,
  //           });
  //           setCustomuserid(doc.id);
  //         });
  //         if (isMounted) console.log('userData.key ');
  //       });
  //     } catch (e) {
  //       console.error('Error userData document: ', e);
  //     }
  //   };

  //   fetchData();

  //   return () => {
  //     isMounted = false;
  //   };
  // }, []);
  function checkAlreadyReview() {
    console.log('checkAlreadyReview Button: ', user.uid);
    try {
      const qc = query(
        collection(db, 'userReview'),
        where('aidUemail', '==', product.email),
        where('email', '==', user.email),
      );

      const unsubscribe = onSnapshot(qc, querySnapshot => {
        var Data = false;
        querySnapshot.forEach(doc => {
          console.log('checkReview data ' + doc.id);
          Data = true;
        });
        setcheckReview(Data);
        console.log('Data ' + Data);
      });
    } catch (e) {
      console.error('Error checkReview document: ', e);
    }
  }

  function checkReviewfun() {
    checkAlreadyReview();
    if (!checkReview) {
      return <WriteReviewUserBook productArray={product} />;
    }
  }

  return (
    <Box safeArea flex={1} bg={'#ffffff'}>
      <Box flex={1} alignItems={'center'} justifyContent={'center'}>
        <Image
          source={{ uri: product.image }}
          alt={product.BookName}
          w="full"
          h={300}
          resizeMode="contain"
        />
      </Box>
      <Box safeArea flex={1} bg={'#ffffff'}>
        <ScrollView px={5} showsVerticalScrollIndicator={false}>
          <Heading fontSize={20} bold mt={3} mb={2} lineHeight={22}>
            {product.BookName}
          </Heading>

          <Box>
            <Box space={2} mY={5} mt={4}>
              <Heading fontSize={12} mt={2}>
                Description:
              </Heading>
              <Text fontSize={12} lineHeight={24}>
                {product.description}
              </Text>
              <Heading fontSize={12} mt={2}>
                Need:
              </Heading>
              <Text fontSize={12} lineHeight={24}>
                {product.need}
              </Text>
              <Heading fontSize={12} mt={2}>
                Phone Number:
              </Heading>
              <Text fontSize={12} lineHeight={24}>
                {product.PhoneNumber}
              </Text>
              <Heading fontSize={12} mt={2}>
                location:
              </Heading>
              <Text fontSize={12} lineHeight={24}>
                {product.location}
              </Text>
              {checkFavoritefun()}
              {checkDelteFun(product.key)}
            </Box>

            <ReviewUserBook
              numReview={product.numReview}
              reviewArray={reviewdata}
              productEmail={product.email}
            />
            {checkReviewfun()}
          </Box>
        </ScrollView>
      </Box>
    </Box>
  );
};

export default SingleProductView;
