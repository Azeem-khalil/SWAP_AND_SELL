import React from 'react';
import { Box, Center, Text } from 'native-base';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const EmptyCart = props => {
  const text = props.text;
  return (
    <Box flex={1}>
      <Center h="100%">
        <Center h={200} w={200} bg={'#ffffff'} rounded="full">
          <FontAwesome5 name="shopping-basket" size={64} color={'#000000'} />
        </Center>
        <Text bold fontSize={21} mt={3}>
          {text} is Empty
        </Text>
      </Center>
    </Box>
  );
};

export default EmptyCart;
