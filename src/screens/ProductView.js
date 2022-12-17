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
import Review from '../Component/Review';
import WriteReview from '../Component/WriteReview';
import { useNavigation } from '@react-navigation/native';
import SwipSlider from '../Component/SwipSlider';
import { auth, db } from '../Component/DataBase/firebase';
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { async } from '@firebase/util';

const ProductView = ({ route }) => {
  const [size, setsize] = useState('');
  const [checkReview, setcheckReview] = useState(false);
  const [checkUserOrderThisProduct, setcheckUserOrderThisProduct] =
    useState(false);
  const [checkCart, setcheckCart] = useState(true);
  const [currentDate, setCurrentDate] = useState('');
  const [quantity, setquantity] = useState('');
  const [reviewdata, setreviewdata] = useState([]);

  const toast = useToast();
  const navigation = useNavigation();
  const product = route.params;
  const user = auth.currentUser;

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
          collection(db, 'shoesReviews'),
          where('productid', '==', product.key),
          //where('userid', '==', user.uid),
        );

        const unsubscribe = await onSnapshot(qc, querySnapshot => {
          const reviewshoesData = [];
          querySnapshot.forEach(doc => {
            console.log('indoc: ' + `${doc.id} => ${doc.data().rating}`);

            reviewshoesData.push({
              ...doc.data(),
              key: doc.id,
            });
          });
          if (isMounted) setreviewdata(reviewshoesData);
          console.log('reviewshoesData ' + reviewshoesData);
        });
      } catch (e) {
        console.error('Error review document: ', e);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [product.key, user.uid]);
  function checkProductDeliveredOrNot(item, index, arr) {
    if (item.productid === product.key) {
      console.log('checkUserPlaceOrderThisProduct myfunctn: ' + item.productid);
      setcheckUserOrderThisProduct(true);
    }
  }
  function checkUserPlaceOrderThisProduct() {
    console.log('checkUserPlaceOrderThisProduct Button: ');

    try {
      const qc = query(
        collection(db, 'placedOrder'),
        where('uid', '==', user.uid),
      );
      const unsubscribe = onSnapshot(qc, querySnapshot => {
        querySnapshot.forEach(doc => {
          doc.data().products.forEach(checkProductDeliveredOrNot);
        });
      });
    } catch (e) {
      console.error('Error check placedOrder : ', e);
    }
  }
  function checkAlreadyReview() {
    console.log('checkAlreadyReview Button: ', user.uid);

    try {
      const qc = query(
        collection(db, 'shoesReviews'),
        where('productid', '==', product.key),
        where('userid', '==', user.uid),
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
      console.error('Error adding document: ', e);
    }
  }

  function checkReviewfun() {
    checkUserPlaceOrderThisProduct();
    if (checkUserOrderThisProduct) {
      checkAlreadyReview();
      if (!checkReview) {
        return <WriteReview productArray={product} />;
      }
    }
  }

  async function ADDtoCART() {
    if (checkCart && user && (!quantity == '' || !quantity == 0)) {
      setcheckCart(false);
      const docRef = await addDoc(collection(db, 'cart'), {
        userName: user.displayName,
        productName: product.name,
        quantity: quantity,
        totalprice: quantity * product.price,
        productid: product.key,
        image: product.image1,
        userid: user.uid,
        date: currentDate,
        size: product.size,
        category: product.category,
      });
      upadteCurrentProductCountInStock();
      setcheckCart(true);
      navigation.navigate('Cart');
    } else {
      toast.show({
        render: () => {
          return (
            <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
              Before add cart Please select quantity
            </Box>
          );
        },
      });
      return;
    }
  }
  async function upadteCurrentProductCountInStock() {
    const Ref = doc(db, 'shoes', product.key);
    console.log('before numreview: ' + product.countInStock);
    // Set the "capital" field of the city 'DC'
    await updateDoc(Ref, {
      countInStock: product.countInStock - quantity,
    });
  }
  return (
    <Box safeArea flex={1} bg={'#ffffff'}>
      <SwipSlider
        Image={{
          image1: product.image1,
          image2: product.image2,
          image3: product.image3,
        }}
      />
      <Box safeArea flex={1} bg={'#ffffff'}>
        <ScrollView px={5} showsVerticalScrollIndicator={false}>
          <Heading fontSize={20} bold mt={3} mb={2} lineHeight={22}>
            {product.name}
          </Heading>
          <Box>
            <HStack space={0.4} mt={1} alignItems="center">
              <Rating
                ratingCount={5}
                imageSize={10}
                startingValue={product.rating}
              />
              {/* <Text mt={2} fontSize={12} lineHeight={24}>
                {product.rating}
              </Text> */}
            </HStack>
          </Box>

          <Box>
            <HStack space={2} mY={5} mt={4} alignItems="center">
              {product.countInStock > 0 ? (
                <Box>
                  <HStack space={2} mY={5} mt={4} alignItems="center">
                    <NumericInput
                      //value={1}
                      onChange={value => setquantity(value)}
                      totalWidth={140}
                      totalHeight={35}
                      iconSize={25}
                      step={1}
                      valueType="real"
                      rounded
                      maxValue={product.countInStock}
                      minValue={1}
                      textColor="#ff0000"
                      iconStyle={{ color: '#000000' }}
                      rightButtonBackgroundColor="#dcdcdc"
                      leftButtonBackgroundColor="#dcdcdc"
                    />
                    <Spacer />
                    <Heading bold color="#000000" fontSize={19}>
                      RS/-{product.price}
                    </Heading>
                  </HStack>
                  <Text mt={2} fontSize={12} lineHeight={24}>
                    Size: {product.size}
                  </Text>
                  <Text mt={2} fontSize={12} lineHeight={24}>
                    Category: {product.category}
                  </Text>
                  <Text mt={2} fontSize={12} lineHeight={24}>
                    {product.description}
                  </Text>
                  <Button
                    borderRadius="full"
                    mt={10}
                    color="#ffffff"
                    bg="#5b21b6"
                    _pressed={{ bg: '#a78bfa' }}
                    onPress={ADDtoCART}
                    disabled={!checkCart}>
                    ADD TO CART
                  </Button>
                </Box>
              ) : (
                <Heading bold color="#ff0000" fontSize={19}>
                  Out Of Stock
                </Heading>
              )}
            </HStack>

            <Review numReview={product.numReview} reviewArray={reviewdata} />

            {checkReviewfun()}
          </Box>
        </ScrollView>
      </Box>
    </Box>
  );
};

export default ProductView;

const styles = StyleSheet.create({});
