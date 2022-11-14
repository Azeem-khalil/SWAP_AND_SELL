import { StyleSheet } from 'react-native';
import React from 'react';
import {
  Box,
  Center,
  Heading,
  HStack,
  ScrollView,
  Text,
  Flex,
} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { Rating, AirbnbRating } from 'react-native-ratings';
const Review = props => {
  return (
    <Box my={9} flex={1}>
      <Heading bold fontSize={15} mb={2}>
        Total Review {props.numReview}
      </Heading>
      <Box p={3} bg={'#f5f5f5'} mt={5} rounded={5} flex={1}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {console.log(props.reviewArray)}
          {props.reviewArray.map(prop => (
            <Box p={3} bg={'#ffffff'} mt={3} mr={3} rounded={5} key={prop._id}>
              <Heading bold fontSize={15} mb={2}>
                {prop.name}
              </Heading>
              <HStack space={0.4} mt={1} alignItems="center">
                <Rating
                  ratingCount={prop.ReviewRate}
                  imageSize={13}
                  startingValue={props.ReviewRate}
                />
              </HStack>
              <Text mb={3} bold>
                {prop.date}
              </Text>
              <Center w={200} bg={'#f8f8ff'} p={4} rounded={5}>
                <Text color={'#000000'} fontSize={12} bold>
                  {prop.message}
                </Text>
              </Center>
            </Box>
          ))}
        </ScrollView>
      </Box>
    </Box>
  );
};

export default Review;
