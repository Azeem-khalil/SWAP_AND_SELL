import { StyleSheet } from 'react-native';
import React, { useState } from 'react';
import {
  Box,
  Center,
  CheckIcon,
  FormControl,
  Heading,
  HStack,
  ScrollView,
  Select,
  Text,
  TextArea,
  VStack,
} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { Rating, AirbnbRating } from 'react-native-ratings';
const WriteReview = () => {
  const [rating, setRating] = useState('');
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
            onValueChange={e => setRating(e)}>
            <Select.Item label="Poor " value={1} />
            <Select.Item label="Fair" value={2} />
            <Select.Item label="Good" value={3} />
            <Select.Item label="Very Good" value={4} />
            <Select.Item label="Excellent" value={5} />
          </Select>
        </FormControl>
        <FormControl>
          <FormControl.Label _text={{ fontSize: '12px', fontWeight: 'bold' }}>
            Comment
          </FormControl.Label>
          <TextArea h={20} w="full" placeholder="Add your "></TextArea>
        </FormControl>
      </VStack>
    </Box>
  );
};

export default WriteReview;
