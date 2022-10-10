import React from 'react';
import {
  Button,
  Modal,
  VStack,
  HStack,
  Text,
  Center,
  NativeBaseProvider,
  FormControl,
  Input,
  Box,
} from 'native-base';
import { useState, useEffect } from 'react';

const DeliveryConfirmModel = () => {
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  return (
    <Box>
      <Center alignItems={'center'}>
        <Button
          w={'75%'}
          h={60}
          mt={3}
          mb={15}
          fontSize={50}
          rounded={'full'}
          bg={'#000000'}
          _text={{
            color: '#ffffff',
            fontWeight: 'bold',
            alignContent: 'center',
          }}
          _pressed={{ bg: '##000000' }}
          onPress={() => setShowModal(true)}>
          Total
        </Button>
      </Center>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="lg">
        <Modal.Content maxWidth="350">
          <Modal.CloseButton />
          <Modal.Header>Order</Modal.Header>
          <Modal.Body>
            <VStack space={3}>
              <HStack alignItems="center" justifyContent="space-between">
                <Text fontWeight="medium">Sub Total</Text>
                <Text color="blueGray.400">$298.77</Text>
              </HStack>
              <HStack alignItems="center" justifyContent="space-between">
                <Text fontWeight="medium">Tax</Text>
                <Text color="blueGray.400">$38.84</Text>
              </HStack>
              <HStack alignItems="center" justifyContent="space-between">
                <Text fontWeight="medium">Total Amount</Text>
                <Text color="green.500">$337.61</Text>
              </HStack>
            </VStack>
          </Modal.Body>
          <Modal.Footer>
            <Button
              flex="1"
              onPress={() => {
                setShowModal2(true);
              }}>
              Continue
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

      <Modal isOpen={showModal2} onClose={() => setShowModal2(false)} size="lg">
        <Modal.Content maxWidth="350">
          <Modal.CloseButton />
          <Modal.Header>Payment on delivery</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Address</FormControl.Label>
              <Input />
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>Zip Code</FormControl.Label>
              <Input />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button
              flex="1"
              onPress={() => {
                setShowModal(false);
                setShowModal2(false);
              }}>
              Confirm Place Order
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Box>
  );
};
export default DeliveryConfirmModel;
// export default () => {
//   return (
//     <NativeBaseProvider>
//       <Center flex={1} px="3">
//         <DeliveryConfirmModel />
//       </Center>
//     </NativeBaseProvider>
//   );
// };
