import React from 'react';
import {
  VStack,
  Button,
  FormControl,
  Input,
  Center,
  ScrollView,
  Heading,
} from 'native-base';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

function Edit_Profile() {
  const [formData, setData] = React.useState({});
  const [errors, setErrors] = React.useState({});

  const validate = () => {
    if (formData.name === undefined) {
      setErrors({ ...errors, name: 'Name is required' });
      return false;
    } else if (formData.name.length < 3) {
      setErrors({ ...errors, name: 'Name is too short' });
      return false;
    }

    return true;
  };

  const onSubmit = () => {
    validate() ? console.log('Submitted') : console.log('Validation Failed');
  };

  return (
    <VStack width="90%" mx="3" maxW="300px">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Heading mb={2}>Edit Profile</Heading>

        <FormControl isRequired isInvalid={'name' in errors}>
          <FormControl.Label
            _text={{
              bold: true,
            }}>
            First Name
          </FormControl.Label>
          <Input
            placeholder="Azeem..."
            onChangeText={value => setData({ ...formData, name: value })}
            InputLeftElement={
              <FontAwesome5Icon
                style={{ marginLeft: 5 }}
                size={20}
                name="name"
              />
            }
          />
          {'name' in errors ? (
            <FormControl.ErrorMessage>Error</FormControl.ErrorMessage>
          ) : (
            <FormControl.HelperText>
              Name should contain atleast 3 character.
            </FormControl.HelperText>
          )}
        </FormControl>

        <FormControl isRequired isInvalid={'Last Name' in errors}>
          <FormControl.Label
            _text={{
              bold: true,
            }}>
            Last Name
          </FormControl.Label>
          <Input
            placeholder="khalil.."
            onChangeText={value => setData({ ...formData, name: value })}
          />
          {'Last Name' in errors ? (
            <FormControl.ErrorMessage>Error</FormControl.ErrorMessage>
          ) : (
            <FormControl.HelperText>
              Last Name should contain atleast 3 character.
            </FormControl.HelperText>
          )}
        </FormControl>
        <FormControl isRequired isInvalid={'Phone Number' in errors}>
          <FormControl.Label
            _text={{
              bold: true,
            }}>
            Phone Number
          </FormControl.Label>
          <Input
            placeholder="03230115794"
            onChangeText={value => setData({ ...formData, name: value })}
          />
          {'Phone Number' in errors ? (
            <FormControl.ErrorMessage>Error</FormControl.ErrorMessage>
          ) : (
            <FormControl.HelperText>
              Phone Number should contain atleast 3 character.
            </FormControl.HelperText>
          )}
        </FormControl>
        <FormControl isRequired isInvalid={'Email' in errors}>
          <FormControl.Label
            _text={{
              bold: true,
            }}>
            Email
          </FormControl.Label>
          <Input
            placeholder="zazeem321@gmail.com"
            onChangeText={value => setData({ ...formData, name: value })}
          />
          {'Email' in errors ? (
            <FormControl.ErrorMessage>Error</FormControl.ErrorMessage>
          ) : (
            <FormControl.HelperText>
              Email should contain atleast 3 character.
            </FormControl.HelperText>
          )}
        </FormControl>
        <FormControl isRequired isInvalid={'Address' in errors}>
          <FormControl.Label
            _text={{
              bold: true,
            }}>
            Address
          </FormControl.Label>
          <Input
            placeholder="Address..."
            onChangeText={value => setData({ ...formData, name: value })}
          />
          {'Address' in errors ? (
            <FormControl.ErrorMessage>Error</FormControl.ErrorMessage>
          ) : (
            <FormControl.HelperText>
              Address should contain atleast 3 character.
            </FormControl.HelperText>
          )}
        </FormControl>

        <Button onPress={onSubmit} mt="5" colorScheme="cyan">
          Submit
        </Button>
      </ScrollView>
    </VStack>
  );
}

export default () => {
  return (
    <Center flex={1} px="3" bg={'#ffffff'}>
      <Edit_Profile />
    </Center>
  );
};
