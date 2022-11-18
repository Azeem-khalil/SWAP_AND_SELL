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
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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
            Name
          </FormControl.Label>
          <Input
            placeholder="Azeem..."
            onChangeText={value => setData({ ...formData, name: value })}
            InputLeftElement={
              <Fontisto style={{ marginLeft: 5 }} size={20} name="person" />
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
            InputLeftElement={
              <FontAwesome style={{ marginLeft: 5 }} size={20} name="phone" />
            }
          />
          {'Phone Number' in errors ? (
            <FormControl.ErrorMessage>Error</FormControl.ErrorMessage>
          ) : (
            <FormControl.HelperText>
              Phone Number should contain atleast 3 character.
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
            InputLeftElement={
              <FontAwesome
                style={{ marginLeft: 5 }}
                size={20}
                name="address-card"
              />
            }
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
