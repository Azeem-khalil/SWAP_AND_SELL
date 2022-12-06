import { Box, Image, Text } from 'native-base';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Swiper from 'react-native-web-swiper';

export default function SwipSlider(props) {
  return (
    <Box style={{ flex: 1 }}>
      <Swiper
        horizantal
        loop
        timeout={4.5}
        controlsProps={{
          dotActiveStyle: { backgroundColor: 'black' },
          cellsContent: {
            'bottom-left': <Text color="#5b21b6">SWAP AND SELL</Text>,
          },
        }}>
        <Box
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={{ uri: props.Image.image1 }}
            alt={'product.Name'}
            w="full"
            h={300}
            resizeMode="contain"
          />
        </Box>
        <Box
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(20,200,20,0.3)',
          }}>
          <Image
            source={{ uri: props.Image.image2 }}
            alt={'product.Name'}
            w="full"
            h={300}
            resizeMode="contain"
          />
        </Box>
        <Box
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={{ uri: props.Image.image3 }}
            alt={'product.Name'}
            w="full"
            h={300}
            resizeMode="contain"
          />
        </Box>
      </Swiper>
    </Box>
  );
}
