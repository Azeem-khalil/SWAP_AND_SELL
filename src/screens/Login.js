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
  useToast,
} from 'native-base';
import { db, auth } from '../Component/DataBase/firebase';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  sendEmailVerification,
  applyActionCode,
} from 'firebase/auth';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';

function Login({ navigation }) {
  const [hidenpass, sethidenpss] = useState(true);
  const toast = useToast();
  const [email, setemail] = useState('');
  const [pass, setpass] = useState('');
  const [errorErrorepassword, setErrorepassword] = useState();
  const [erroremail, setErroremail] = useState();
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const validatepassword = password => {
    let regex =
      /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{8,16}$/;
    return regex.test(password);
  };

  const validateemail = emailv => {
    let re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(emailv);
  };
  const validate = () => {
    let returnfalse = true;

    if (email === '') {
      setErroremail('Email Address is Required');
      returnfalse = false;
    } else if (!validateemail(email)) {
      setErroremail('Please enter valid email. ');
      returnfalse = false;
    }
    if (pass === '') {
      setErrorepassword('password is required');
      returnfalse = false;
    } else if (!validatepassword(pass)) {
      setErrorepassword(
        'Password should contain atleast 8 character. \natleast one Alphabet one symbol and one number',
      );
      returnfalse = false;
    }
    if (returnfalse) {
      return true;
    } else {
      return false;
    }
  };
  function Submited() {
    setSubmitButtonDisabled(true);
    signInWithEmailAndPassword(auth, email, pass)
      .then(userCredential => {
        setSubmitButtonDisabled(false);
        const user = userCredential.user.uid;
        console.log(user);
        // AsyncStorage.setItem('user_id', userCredential.user.uid);

        navigation.navigate('Mainnavigation');
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
      });
  }
  const handleSubmission = () => {
    validate() ? Submited() : console.log('Validation Failed');

    //console.log(errorMsg);
  };

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
              <Input
                isRequire
                onChangeText={TEXT => {
                  setemail(TEXT);
                }}
              />
              {erroremail ? (
                <Text color={'#ff0000'}>{erroremail}</Text>
              ) : (
                <FormControl.HelperText></FormControl.HelperText>
              )}
            </FormControl>
            <FormControl>
              <FormControl.Label>Password</FormControl.Label>
              <Input
                secureTextEntry={hidenpass}
                isRequire
                onChangeText={TEXT => {
                  setpass(TEXT);
                }}
                InputRightElement={
                  hidenpass ? (
                    <Ionicons
                      onPress={() => sethidenpss(!hidenpass)}
                      size={20}
                      name="eye"
                    />
                  ) : (
                    <Ionicons
                      onPress={() => sethidenpss(!hidenpass)}
                      size={20}
                      name="eye-off"
                    />
                  )
                }
              />
              {errorErrorepassword ? (
                <Text color={'#ff0000'}>{errorErrorepassword}</Text>
              ) : (
                <FormControl.HelperText>
                  Password should contain atleast 8 character. atleast one
                  Alphabet one symbol and one number
                </FormControl.HelperText>
              )}
              <Link
                onPress={() => navigation.navigate('ForgetPassword')}
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
            <Button onPress={handleSubmission} mt="2" bg={'#581c87'}>
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
