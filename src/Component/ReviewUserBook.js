import { StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  Box,
  Center,
  Heading,
  HStack,
  ScrollView,
  Text,
  Flex,
} from 'native-base';
import { collection, query, where, getDocs } from 'firebase/firestore';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { auth, db } from './DataBase/firebase';
const ReviewUserBook = props => {
  const [userRating, setuserRating] = useState(0.0);
  useEffect(() => {
    let isMounted = true;
    const user = auth.currentUser;

    const fetchData = async () => {
      console.log('press Button: ', user.email);

      try {
        const q = query(
          collection(db, 'user'),
          where('email', '==', props.productEmail),
        );

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(doc => {
          console.log(doc.id, ' => ', doc.data());
          if (isMounted) {
            setuserRating(doc.data().rating);
            console.log('rating.keyvvvv ');
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
  }, [props.productEmail]);

  return (
    <Box my={9} flex={1}>
      <Heading bold fontSize={15} mt={7}>
        User Review
      </Heading>
      <Box>
        <HStack space={0.5} alignItems="center">
          <Rating ratingCount={5} imageSize={10} startingValue={userRating} />
        </HStack>
      </Box>
      <Heading my={9} bold fontSize={15} mb={2}>
        Review
        {/* {props.numReview} */}
      </Heading>
      <Box p={3} bg={'#f5f5f5'} mt={5} rounded={5} flex={1}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {console.log(props.reviewArray)}
          {props.reviewArray.length > 0 ? (
            <>
              {props.reviewArray.map(prop => (
                <Box
                  p={3}
                  bg={'#ffffff'}
                  mt={3}
                  mr={3}
                  rounded={5}
                  key={prop.key}>
                  <Heading bold fontSize={15} mb={2}>
                    {prop.userName}
                  </Heading>
                  <HStack space={0.4} mt={1} alignItems="center">
                    <Rating
                      ratingCount={5}
                      imageSize={10}
                      startingValue={prop.rating}
                    />
                  </HStack>
                  <Text mb={3} bold>
                    {prop.date}
                  </Text>
                  <Box w={200} bg={'#f8f8ff'} p={4} rounded={5}>
                    <Text color={'#000000'} fontSize={12} bold>
                      {prop.commment}
                    </Text>
                  </Box>
                </Box>
              ))}
            </>
          ) : (
            <Heading bold color="#5b21b6" fontSize={19}>
              No Review
            </Heading>
          )}
        </ScrollView>
      </Box>
    </Box>
  );
};

export default ReviewUserBook;
