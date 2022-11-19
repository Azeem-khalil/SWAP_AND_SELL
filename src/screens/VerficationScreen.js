import React from 'react';
import { Box, Button, Heading, Text } from 'native-base';
import RNRestart from 'react-native-restart';
import { auth } from '../Component/DataBase/firebase';
const VerficationScreen = () => {
  const startReload = () => RNRestart.Restart();
  return (
    <Box alignItems={'center'}>
      <Heading> Email Verification </Heading>
      <Text>Go Email: {auth.currentUser.email} for Verification</Text>

      <Button title="Reload" onPress={startReload} />
    </Box>
  );
};

export default VerficationScreen;
