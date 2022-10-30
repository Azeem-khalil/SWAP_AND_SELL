// // components/login.js
// import React, { Component } from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   Button,
//   Alert,
//   ActivityIndicator,
//   ToastAndroid,
// } from 'react-native';
// import firebase from '../DataBase/firebase';
// import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

// //import { AsyncStorage } from '@react-native-async-storage/async-storage';
// import { AsyncStorage } from 'react-native';
// //import auth from '@react-native-firebase/auth';
// require('firebase/auth');
// const auth = getAuth(firebase);
// //const user = auth.currentUser;
// export default class Login extends Component {
//   constructor() {
//     super();
//     this.state = {
//       email: '',
//       password: '',
//       isLoading: false,
//     };
//   }
//   updateInputVal = (val, prop) => {
//     const state = this.state;
//     state[prop] = val;
//     this.setState(state);
//   };
//   userLogin = async () => {
//     // await AsyncStorage.setItem('key', 'val1');
//     //await AsyncStorage.setItem('LOGIN_TOKEN', 'azeem');
//     if (this.state.email === '' && this.state.password === '') {
//       Alert.alert('Enter details to signin!');
//     } else {
//       this.setState({
//         isLoading: true,
//       });
//       signInWithEmailAndPassword(auth, this.state.email, this.state.password)
//         .then(res => {
//           // console.log(h);
//           // history.push("/");
//           AsyncStorage.setItem('LOGIN_TOKEN', 'azeem');

//           console.log('User logged-in successfully!');

//           this.setState({
//             isLoading: false,
//             email: '',
//             password: '',
//           });
//           // console.log('That email address is invalid! OR PASWORD INCORECT!');
//           ToastAndroid.showWithGravity(
//             'User logged-in successfully!',
//             ToastAndroid.LONG,
//             ToastAndroid.BOTTOM,
//           );
//           //AsyncStorage.setItem('LOGIN_TOKEN', res);
//           //localStorage
//           //console.log('User ' + res);
//           this.props.navigation.navigate('Dashboard');
//         })
//         .catch(error => {
//           this.setState({
//             isLoading: false,
//           });
//           // if (error.code === 'auth/email-already-in-use') {
//           //   console.log('That email address is already in use!');
//           //   ToastAndroid.showWithGravity(
//           //     'Email Already exist ' + 'That email address is already in use!',
//           //     ToastAndroid.LONG,
//           //     ToastAndroid.BOTTOM,
//           //   );
//           // }
//           // if (error.code === 'auth/invalid-email')

//           console.log('That email address is invalid! OR PASWORD INCORECT!');
//           ToastAndroid.showWithGravity(
//             'That email address is invalid! OR PASWORD INCORECT!',
//             ToastAndroid.LONG,
//             ToastAndroid.BOTTOM,
//           );

//           this.setState({ errorMessage: error.message });
//         });
//     }
//   };
//   render() {
//     if (this.state.isLoading) {
//       return (
//         <View style={styles.preloader}>
//           <ActivityIndicator size="large" color="#9E9E9E" />
//         </View>
//       );
//     }
//     return (
//       <View style={styles.container}>
//         <TextInput
//           style={styles.inputStyle}
//           placeholder="Email"
//           value={this.state.email}
//           onChangeText={val => this.updateInputVal(val, 'email')}
//         />
//         <TextInput
//           style={styles.inputStyle}
//           placeholder="Password"
//           value={this.state.password}
//           onChangeText={val => this.updateInputVal(val, 'password')}
//           maxLength={15}
//           secureTextEntry={true}
//         />
//         <Button
//           color="#3740FE"
//           title="Signin"
//           onPress={() => this.userLogin()}
//         />
//         <Text
//           style={styles.loginText}
//           onPress={() => this.props.navigation.navigate('Signup')}>
//           Don't have account? Click here to signup
//         </Text>
//       </View>
//     );
//   }
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'center',
//     padding: 35,
//     backgroundColor: '#fff',
//   },
//   inputStyle: {
//     width: '100%',
//     marginBottom: 15,
//     paddingBottom: 15,
//     alignSelf: 'center',
//     borderColor: '#ccc',
//     borderBottomWidth: 1,
//   },
//   loginText: {
//     color: '#3740FE',
//     marginTop: 25,
//     textAlign: 'center',
//   },
//   preloader: {
//     left: 0,
//     right: 0,
//     top: 0,
//     bottom: 0,
//     position: 'absolute',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#fff',
//   },
// });

import { View } from 'react-native';
import React, { useState } from 'react';
import {
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  HStack,
  Center,
  NativeBaseProvider,
} from 'native-base';
import { db } from '../Component/DataBase/firebase';
import { addDoc, collection } from 'firebase/firestore';

function Login({ navigation }) {
  const [routing, setRouting] = useState(false);
  async function Addproduct() {
    console.log('press Button: ');

    try {
      const docRef = await addDoc(collection(db, 'shoes'), {
        name: 'men shoes PNG7492',
        image:
          'https://www.freepnglogos.com/uploads/shoes-png/shoes-shoe-png-transparent-shoe-images-pluspng-17.png',
        description:
          'You can use shoes, shoe png transparent shoe images high-quality image to inspire your logo work and create more beautiful logos. You can also use them on websites, magazines, prints, presentations, graphics and video work',
        price: 77,
        size: 10,
        condition: 5,
        countInStock: 12,
        rating: 4.6,
        numReview: 4,
      });
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }
  return (
    <Center flex={1} px="3">
      <Center w="100%">
        <Box safeArea p="2" py="8" w="90%" maxW="290">
          <Heading
            size="lg"
            fontWeight="600"
            color="coolGray.800"
            _dark={{
              color: 'warmGray.50',
            }}>
            Welcome
          </Heading>
          <Heading
            mt="1"
            _dark={{
              color: 'warmGray.200',
            }}
            color="coolGray.600"
            fontWeight="medium"
            size="xs">
            Sign in to continue!
          </Heading>

          <VStack space={3} mt="5">
            <FormControl>
              <FormControl.Label>Email ID</FormControl.Label>
              <Input />
            </FormControl>
            <FormControl>
              <FormControl.Label>Password</FormControl.Label>
              <Input type="password" />
              <Link
                _text={{
                  fontSize: 'xs',
                  fontWeight: '500',
                  color: 'indigo.500',
                }}
                alignSelf="flex-end"
                mt="1">
                Forget Password?
              </Link>
            </FormControl>
            <Button
              onPress={() => navigation.navigate('Mainnavigation')}
              //onPress={Addproduct}
              mt="2"
              colorScheme="indigo">
              Sign in
            </Button>
            <HStack mt="6" justifyContent="center">
              <Text
                fontSize="sm"
                color="coolGray.600"
                _dark={{
                  color: 'warmGray.200',
                }}>
                I'm a new user.{' '}
              </Text>

              <Link
                _text={{
                  color: 'indigo.500',
                  fontWeight: 'medium',
                  fontSize: 'sm',
                }}
                onPress={() => navigation.navigate('Signup')}>
                Sign Up
              </Link>
            </HStack>
          </VStack>
        </Box>
      </Center>
    </Center>
  );
}

export default Login;
