import { StyleSheet } from 'react-native';
import React from 'react';
import {
  Flex,
  ScrollView,
  Image,
  Pressable,
  Box,
  Heading,
  Text,
} from 'native-base';
import Product from '../data/Product';
import Rating from '../../Component/Rating';
import { useNavigation } from '@react-navigation/native';

const Content = () => {
  const navigation = useNavigation();

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Flex
        flexWrap="wrap"
        direction="row"
        justifyContent="space-between"
        px={6}>
        {Product.map(product => (
          <Pressable
            onPress={() => navigation.navigate('ProductView', product)}
            key={product._id}
            w="47%"
            bg={'#ffffff'}
            rounded="md"
            pt={0.3}
            my={3}
            pb={2}
            overflow="hidden">
            <Image
              source={{ uri: product.Image }}
              alt={product.Name}
              w="full"
              h={24}
              resizeMode="contain"
            />

            <Box px={4} pt={1}>
              <Heading size="sm" bold>
                ${product.price}
              </Heading>
              <Text fontSize={12} mt={1} isTruncated w="full">
                {product.Name}
              </Text>
              <Rating value={product.rating} size={10} />
            </Box>
          </Pressable>
        ))}
      </Flex>
    </ScrollView>
  );
};

export default Content;

const styles = StyleSheet.create({});
