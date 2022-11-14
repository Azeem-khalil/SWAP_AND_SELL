import { StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  Flex,
  ScrollView,
  Image,
  Pressable,
  Box,
  Heading,
  Text,
  Button,
} from 'native-base';
import Rating from '../../Component/Rating';
import { useNavigation } from '@react-navigation/native';
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from 'firebase/firestore';
import { firebase, db } from '../DataBase/firebase';
import roduct from '../data/Product';

const Content = props => {
  const [Productd, setProduct] = useState({});
  const navigation = useNavigation();
  const product = props.ProductData;
  //Product(...props.ProductData);

  return (
    <Box flex={1} bg={'#f8f8ff'}>
      {
        //console.log('Product: ' + product)
      }
      <Box>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* <Button title="Read Doc" onPress={Read}></Button> */}
          <Flex
            flexWrap="wrap"
            direction="row"
            justifyContent="space-between"
            px={6}>
            {/* {product.map((product, index) => {
              <Pressable
                onPress={() =>
                  navigation.navigate('ProductView', product, index)
                }
                key={index}
                w="47%"
                bg={'#ffffff'}
                rounded="md"
                pt={0.3}
                my={3}
                pb={2}
                overflow="hidden">
                <Image
                  source={{ uri: product.image1 }}
                  alt={product.name}
                  w="full"
                  h={24}
                  resizeMode="contain"
                />

                <Box px={4} pt={1}>
                  {console.log('cmpin: ' + `${product.name}`)}

                  <Heading size="sm" bold>
                    ${product.price}
                  </Heading>
                  <Text fontSize={12} mt={1} isTruncated w="full">
                    {product.name}
                  </Text>
                  <Rating value={product.rating} size={10} />
                </Box>
               
              </Pressable>;
            })} */}
            {product.map(product => (
              <Pressable
                onPress={() => navigation.navigate('ProductView', product)}
                key={product.key}
                w="47%"
                bg={'#ffffff'}
                rounded="md"
                pt={0.3}
                my={3}
                pb={2}
                overflow="hidden">
                <Image
                  source={{ uri: product.image1 }}
                  alt={product.name}
                  w="full"
                  h={24}
                  resizeMode="contain"
                />

                <Box px={4} pt={1}>
                  <Heading size="sm" bold>
                    ${product.price}
                  </Heading>
                  <Text fontSize={12} mt={1} isTruncated w="full">
                    {product.name}
                  </Text>
                  <Rating value={product.rating} size={10} />
                </Box>
                {/* {_ListProduct} */}
              </Pressable>
            ))}
          </Flex>
        </ScrollView>
      </Box>
    </Box>
  );
};

export default Content;

// const Content = ({ route }) => {
//   const [ListProduct, setListProduct] = useState({});
//   const navigation = useNavigation();
//   const product = route.params;
//   ListProduct(...product);
//   return (
//     <Box flex={1} bg={'#f8f8ff'}>
//       <Box>
//         <ScrollView showsVerticalScrollIndicator={false}>
//           {/* <Button title="Read Doc" onPress={Read}></Button> */}
//           <Flex
//             flexWrap="wrap"
//             direction="row"
//             justifyContent="space-between"
//             px={6}>
//             {Object.keys(ListProduct).map((id, index) => {
//               return <td>{ListProduct[id].firstname}</td>;
//             })}
//             {Object.keys(ListProduct).map((id, index) => {
//               return (
//                 <>
//                   <Pressable
//                     onPress={() =>
//                       navigation.navigate('ProductView', ListProduct[id])
//                     }
//                     key={id}
//                     w="47%"
//                     bg={'#ffffff'}
//                     rounded="md"
//                     pt={0.3}
//                     my={3}
//                     pb={2}
//                     overflow="hidden">
//                     <Image
//                       source={{ uri: ListProduct[id].Image }}
//                       alt={ListProduct[id].Name}
//                       w="full"
//                       h={24}
//                       resizeMode="contain"
//                     />

//                     <Box px={4} pt={1}>
//                       <Heading size="sm" bold>
//                         ${ListProduct[id].price}
//                       </Heading>
//                       <Text fontSize={12} mt={1} isTruncated w="full">
//                         {ListProduct[id].Name}
//                       </Text>
//                       <Rating value={ListProduct[id].rating} size={10} />
//                     </Box>
//                     {/* {_ListProduct} */}
//                   </Pressable>
//                   ;
//                 </>
//               );
//             })}
//           </Flex>
//         </ScrollView>
//       </Box>
//     </Box>
//   );
// };
