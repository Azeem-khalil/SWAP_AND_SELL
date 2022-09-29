import { Pressable, StyleSheet, Text, View } from 'react-native';
import { NativeBaseProvider, Box, HStack, Input } from 'native-base';
import Ionicons from 'react-native-vector-icons/FontAwesome5';
import React from 'react';

const CustomHeader = () => {
  return (
    <Box>
      <HStack
        space={3}
        width={'full'}
        px={6}
        py={4}
        bg={'#000000'}
        alignItems={'center'}
        safeArea>
        <Input
          placeholder="Nike, Adidas...."
          w="85%"
          h={12}
          bg={'#ffffff'}
          type="search"
          variant={'filled'}
          borderWidth={0}
          _focus={{ bg: '#ffffff' }}
          fontSize={20}
        />
        <Pressable ml={3}>
          <Ionicons name="shopping-basket" color={'#ffffff'} size={24} />
          <Box
            px={1}
            rounded={'full'}
            position={'absolute'}
            top={-13}
            left={2}
            bg={'#ff0000'}
            _text={{ color: '#ffffff', fontSize: '11px' }}>
            5
          </Box>
        </Pressable>
      </HStack>
    </Box>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({});
