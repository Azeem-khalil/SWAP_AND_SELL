import {
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  Center,
  useToast,
  Toast,
  Text,
} from 'native-base';
import React, { useState } from 'react';
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

import Ionicons from 'react-native-vector-icons/Ionicons';
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
  const [errorErrorepassword, setErrorepassword] = useState();
  const [erroremail, setErroremail] = useState();
  const [errorname, setErrorname] = useState();

  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const [hidenpass, sethidenpss] = useState(true);
  const [hidenconfirmpass, sethidenconfirmpass] = useState(true);

  const validatename = name => {
    //let re = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/;

    let re = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]+[ ]*)*$/;
    return re.test(name);
  };
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
    if (name === '') {
      setErrorname('Name is Required');
      returnfalse = false;
    } else if (!validatename(name)) {
      setErrorname('Please enter valid Name. ');
      returnfalse = false;
    } else if (name.length < 3) {
      setErrorname('Name is too short');
    }
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
  async function Submeted() {
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
      });
  }
  const handleSubmission = async () => {
    validate() ? Submeted() : console.log('Validation Failed');

    if (pass !== conformPass) {
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
              {errorname ? (
                <Text color={'#ff0000'}>{errorname}</Text>
              ) : (
                <FormControl.HelperText>
                  Name should contain atleast 3 character.
                </FormControl.HelperText>
              )}
            </FormControl>
            <FormControl>
              <FormControl.Label>Email</FormControl.Label>
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
                value={pass}
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
            </FormControl>
            <FormControl>
              <FormControl.Label>Confirm Password</FormControl.Label>
              <Input
                secureTextEntry={hidenconfirmpass}
                isRequire
                onChangeText={TEXT => {
                  setconformPass(TEXT);
                }}
                InputRightElement={
                  hidenconfirmpass ? (
                    <Ionicons
                      onPress={() => sethidenconfirmpass(!hidenconfirmpass)}
                      size={20}
                      name="eye"
                    />
                  ) : (
                    <Ionicons
                      onPress={() => sethidenconfirmpass(!hidenconfirmpass)}
                      size={20}
                      name="eye-off"
                    />
                  )
                }
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
