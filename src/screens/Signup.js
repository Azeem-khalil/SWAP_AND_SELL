// // components/signup.js
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
// //import { getAuth } from 'firebase/auth';
// import {
//   getAuth,
//   createUserWithEmailAndPassword,
//   updateProfile,
// } from 'firebase/auth';
// import firebase from '../DataBase/firebase';
// //import auth from '@react-native-firebase/auth';
// require('firebase/auth');

// const auth = getAuth(firebase);
// //const auth = firebase;

// export default class Signup extends Component {
//   constructor() {
//     super();
//     this.state = {
//       displayName: '',
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
//   registerUser = () => {
//     if (
//       this.state.displayName === '' ||
//       this.state.email === '' ||
//       this.state.password === ''
//     ) {
//       Alert.alert('Enter details to signup!');
//     } else {
//       this.setState({
//         isLoading: false,
//       });
//       this.props.navigation.navigate('Login');
//       // auth
//       //   .createUserWithEmailAndPassword(
//       //     'jane.doe@example.com',
//       //     'SuperSecretPassword!',
//       //   )
//       //   .then(() => {
//       //     console.log('User account created & signed in!');
//       //   })
//       //   .catch(error => {
//       //     if (error.code === 'auth/email-already-in-use') {
//       //       console.log('That email address is already in use!');
//       //     }

//       //     if (error.code === 'auth/invalid-email') {
//       //       console.log('That email address is invalid!');
//       //     }

//       //     console.error(error);
//       //   });
//       //console.log('User registered successfully!');

//       createUserWithEmailAndPassword(
//         auth,
//         this.state.email,
//         this.state.password,
//       )
//         .then(userCredential => {
//           console.log('ul ');
//           //console.log('useremail ' + user.email);
//           // Signed in
//           //console.log('User registered successfully!');
//           //this.props.navigation.navigate('Login');
//           const user = userCredential.user;
//           // ...
//           console.log('user.email ');
//           updateProfile(user, {
//             displayName: this.state.displayName,
//           });
//           //console.log('User ' + user.displayName);

//           console.log(
//             'User registered successfully!' +
//               user.displayName +
//               ' ' +
//               user.email,
//           );
//           this.setState({
//             isLoading: false,
//             displayName: '',
//             email: '',
//             password: '',
//           });
//           this.props.navigation.navigate('Login');
//         })
//         .catch(error => {
//           this.setState({
//             isLoading: false,
//           });
//           if (error.code === 'auth/email-already-in-use') {
//             console.log('That email address is already in use!');
//             ToastAndroid.showWithGravity(
//               'Email Already exist ' + 'That email address is already in use!',
//               ToastAndroid.LONG,
//               ToastAndroid.BOTTOM,
//             );
//           }
//           if (error.code === 'auth/invalid-email') {
//             console.log('That email address is invalid!');
//             ToastAndroid.showWithGravity(
//               'That email address is invalid!',
//               ToastAndroid.LONG,
//               ToastAndroid.BOTTOM,
//             );
//           }
//           this.setState({ errorMessage: error.message });
//         });

//       // .then(res => {
//       //   res.user.updateProfile({
//       //     displayName: this.state.displayName,
//       //   });
//       //   console.log('User registered successfully!');
//       //   this.setState({
//       //     isLoading: false,
//       //     displayName: '',
//       //     email: '',
//       //     password: '',
//       //   });
//       //   this.props.navigation.navigate('Login');
//       // })
//       // .catch(error => this.setState({ errorMessage: error.message }));
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
//           placeholder="Name"
//           value={this.state.displayName}
//           onChangeText={val => this. (val, 'displayName')}
//         />
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
//           title="Signup"
//           onPress={() => this.registerUser()}
//         />
//         <Text
//           style={styles.loginText}
//           onPress={() => this.props.navigation.navigate('Login')}>
//           Already Registered? Click here to login
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

import {
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  Center,
  useToast,
} from 'native-base';

import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../Component/DataBase/firebase';
const Signup = ({ navigation }) => {
  const toast = useToast();
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [pass, setpass] = useState('');
  const [conformPass, setconformPass] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmission = () => {
    console.log('start');
    console.log(name);
    if (!name || !email || !pass) {
      setErrorMsg('Fill all fields');
      toast.show({
        render: () => {
          return (
            <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
              Fill all fields
            </Box>
          );
        },
      });
      return;
    }
    if (pass !== conformPass) {
      setErrorMsg('passowrd and confirom password are note match');
      toast.show({
        render: () => {
          return (
            <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
              passowrd and confirom password are note match
            </Box>
          );
        },
      });
      return;
    }
    //console.log(errorMsg);

    setErrorMsg('');
    console.log('bfr');
    console.log(name);

    setSubmitButtonDisabled(true);
    createUserWithEmailAndPassword(auth, email, pass)
      .then(async userCredential => {
        setSubmitButtonDisabled(false);
        const user = userCredential.user;
        await updateProfile(user, {
          displayName: name,
        });

        navigation.navigate('Login');
      })
      .catch(err => {
        setSubmitButtonDisabled(false);
        toast.show({
          render: () => {
            return (
              <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
                {err.message}
              </Box>
            );
          },
        });
        console.log('log error ' + err.message);
        setErrorMsg(err.message);
      });
  };

  return (
    <Center flex={1} px="3">
      <Center w="100%">
        <Box safeArea p="2" w="90%" maxW="290" py="8">
          <Heading
            size="lg"
            color="coolGray.800"
            _dark={{
              color: 'warmGray.50',
            }}
            fontWeight="semibold">
            Welcome
          </Heading>
          <Heading
            mt="1"
            color="coolGray.600"
            _dark={{
              color: 'warmGray.200',
            }}
            fontWeight="medium"
            size="xs">
            Sign up to continue!
          </Heading>
          <VStack space={3} mt="5">
            <FormControl>
              <FormControl.Label>Name</FormControl.Label>
              <Input
                isRequire
                onChangeText={TEXT => {
                  setname(TEXT);
                }}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Email</FormControl.Label>
              <Input
                isRequire
                onChangeText={TEXT => {
                  setemail(TEXT);
                }}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Password</FormControl.Label>
              <Input
                type="password"
                isRequire
                onChangeText={TEXT => {
                  setconformPass(TEXT);
                }}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Confirm Password</FormControl.Label>
              <Input
                type="password"
                isRequire
                onChangeText={TEXT => {
                  setpass(TEXT);
                }}
              />
            </FormControl>
            <Button
              onPress={handleSubmission}
              mt="2"
              colorScheme="indigo"
              isDisabled={submitButtonDisabled}>
              Sign up
            </Button>
          </VStack>
        </Box>
      </Center>
    </Center>
  );
};

export default Signup;
