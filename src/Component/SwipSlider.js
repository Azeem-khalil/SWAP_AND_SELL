import { Box, Image } from 'native-base';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Swiper from 'react-native-web-swiper';

export default function SwipSlider(props) {
  return (
    <Box style={{ flex: 1 }}>
      <Swiper
        horizantal
        loop
        timeout={4.5}
        controlsProps={{
          dotActiveStyle: { backgroundColor: 'red' },
          cellsContent: {
            'bottom-left': <Text>SOME LOGO</Text>,
          },
        }}>
        <Box
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={{ uri: props.Image }}
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
          <Text>Slide 2</Text>
        </Box>
        <Box
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={{ uri: props.Image }}
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
