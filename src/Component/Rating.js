import { StyleSheet } from 'react-native';
import React from 'react';
import { Box, HStack } from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { Rating, AirbnbRating } from 'react-native-ratings';

function rating({ value, size }) {
  const color = '#ffa500';
  return (
    <Box>
      <HStack space={0.4} mt={1} alignItems="center">
        <Rating ratingCount={5} imageSize={size} startingValue={value} />
      </HStack>
    </Box>
  );
}

export default rating;

const styles = StyleSheet.create({});
