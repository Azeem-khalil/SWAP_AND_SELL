import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  Input,
  useToast,
  VStack,
} from 'native-base';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../Component/DataBase/firebase';
function ForgetPassword({ navigation }) {
  const [formData, setData] = useState({});
  const [errors, setErrors] = useState({});
  const toast = useToast();
  function ActionForgetPassword() {
    console.log('Submitted');
    sendPasswordResetEmail(auth, formData.email)
      .then(() => {
        console.log('Password reset email sent!');
        navigation.navigate('Login');
        // Password reset email sent!
        // ..
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.show({
          render: () => {
            return (
              <Box bg="#ffffff" px="2" py="1" rounded="sm" mb={5}>
                Invalid Email!!!
              </Box>
            );
          },
        });
        console.log('Invalid Email!');
        // ..
      });
  }
  const validate = () => {
    if (formData.email === undefined) {
      setErrors({ ...errors, email: 'email is required' });
      return false;
    } else if (formData.email.length < 3) {
      setErrors({ ...errors, email: 'email is too short' });
      return false;
    }

    return true;
  };

  const onSubmit = () => {
    validate()
      ? ActionForgetPassword()
      : toast.show({
          render: () => {
            return (
              <Box bg="#ffffff" px="2" py="1" rounded="sm" mb={5}>
                Empty Failed!!
              </Box>
            );
          },
        });
  };

  return (
    <Center flex={1}>
      <VStack width="90%" mx="3" maxW="300px">
        <Heading> Forget Password</Heading>

        <FormControl mt={5} isRequired isInvalid={'email' in errors}>
          <FormControl.Label
            _text={{
              bold: true,
            }}>
            Enter Email
          </FormControl.Label>
          <Input
            placeholder="swap@gmail.com"
            onChangeText={value => setData({ ...formData, email: value })}
          />
          {'email' in errors ? (
            <FormControl.ErrorMessage>Error</FormControl.ErrorMessage>
          ) : (
            <FormControl.HelperText>
              email should be valid.
            </FormControl.HelperText>
          )}
        </FormControl>
        <Button onPress={onSubmit} mt="7" bg={'#581c87'}>
          Submit
        </Button>
      </VStack>
    </Center>
  );
}
export default ForgetPassword;
