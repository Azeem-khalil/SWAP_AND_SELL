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

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import React, { useState } from 'react';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from 'firebase/auth';
import { auth, db } from '../Component/DataBase/firebase';

const Signup = ({ navigation }) => {
  const toast = useToast();
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [pass, setpass] = useState('');
  const [conformPass, setconformPass] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmission = async () => {
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
        const user = userCredential.user;
        const actionCodeSettings = {
          url: 'https://database-a86a6.firebaseapp.com',
          handleCodeInApp: true,
        };
        // Obtain code from the user.
        //applyActionCode(auth, code);
        console.log('log error ' + auth.currentUser);

        sendEmailVerification(user, actionCodeSettings).then(async () => {
          await updateProfile(user, {
            displayName: name,
          });
          const docRef = await addDoc(collection(db, 'user'), {
            displayName: name,
            email: email,
            address: '',
            phoneNumber: '',
            profileImage: null,
            rating: 0,
            star1: 0,
            star2: 0,
            star3: 0,
            star4: 0,
            star5: 0,
          });
          setSubmitButtonDisabled(false);
          //navigation.navigate('Login');
        });

        console.console.log('aftr logn');
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
              bg={'#581c87'}
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
