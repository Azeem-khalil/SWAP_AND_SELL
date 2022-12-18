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
  const [errorMsg, setErrorMsg] = useState('');
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmission = () => {
    console.log('start');

    if (!email || !pass) {
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

    //console.log(errorMsg);

    setSubmitButtonDisabled(true);
    signInWithEmailAndPassword(auth, email, pass)
      .then(userCredential => {
        setSubmitButtonDisabled(false);
        const user = userCredential.user.uid;
        console.log(user);

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
