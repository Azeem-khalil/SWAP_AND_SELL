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
  useToast,
} from 'native-base';
import { useState, useEffect } from 'react';
import { auth, db } from './DataBase/firebase';
import { addDoc, collection, deleteDoc, doc } from 'firebase/firestore';

const DeliveryConfirmModel = props => {
  const [currentDate, setCurrentDate] = useState('');
  const [formData, setData] = useState({});

  const Total = props.Total;
  const CartData = props.CartData;
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [checkConfirmOrder, setcheckConfirmOrder] = useState(true);

  const toast = useToast();
  const user = auth.currentUser;
  useEffect(() => {
    let isMounted = true;
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    if (isMounted) {
      setCurrentDate(
        date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec,
      );
    }
    return () => {
      isMounted = false;
    };
  }, []);
  function deleteCartProduct(cartdata) {
    cartdata.forEach(async cartdata => {
      await deleteDoc(doc(db, 'cart', cartdata.key));
      console.log(cartdata.key);
    });
  }
  async function ConfirmOrder() {
    if (
      checkConfirmOrder &&
      !formData.zipCode == '' &&
      !formData.phoneNumber == '' &&
      !formData.address == ''
    ) {
      toast.show({
        render: () => {
          return (
            <Box bg="#ffffff" px="2" py="1" rounded="sm" mb={5}>
              Order successfully Conirm!!!
            </Box>
          );
        },
      });
      setcheckConfirmOrder(false);
      const docRef = await addDoc(collection(db, 'padingOrder'), {
        userName: user.displayName,
        uid: user.uid,
        zipCode: formData.zipCode,
        address: formData.address,
        phoneNumber: formData.phoneNumber,
        date: currentDate,
        total: Total,
        products: CartData,
      });
      setcheckConfirmOrder(true);
      deleteCartProduct(CartData);
      //navigation.navigate('Cart');
      setShowModal(false);
      setShowModal2(false);
    } else {
      toast.show({
        render: () => {
          return (
            <Box bg="#ffffff" px="2" py="1" rounded="sm" mb={5}>
              Before Confirm Order Please Fill all section!!
            </Box>
          );
        },
      });
      return;
    }
  }
  return (
    <>
      <Center alignItems={'center'}>
        <Button
          _text={{
            color: '#000000',
            fontWeight: 'medium',
            fontSize: 'sm',
          }}
          mt={3}
          bgColor="#d8b4fe"
          colorScheme="indigo"
          p={3}
          onPress={() => setShowModal(true)}>
          Confirm Order
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
                <Text color="blueGray.400">RS/-{Total}</Text>
              </HStack>
              <HStack alignItems="center" justifyContent="space-between">
                <Text fontWeight="medium">Tax</Text>
                <Text color="blueGray.400">RS/-0.0</Text>
              </HStack>
              <HStack alignItems="center" justifyContent="space-between">
                <Text fontWeight="medium">Total Amount</Text>
                <Text color="green.500">RS/-{Total}</Text>
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
              <Input
                placeholder="Address..."
                onChangeText={value => setData({ ...formData, address: value })}
              />
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>Zip Code</FormControl.Label>
              <Input
                placeholder="Zip Code..."
                onChangeText={value => setData({ ...formData, zipCode: value })}
              />
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>Phone Number</FormControl.Label>
              <Input
                placeholder="Phone Number..."
                onChangeText={value =>
                  setData({ ...formData, phoneNumber: value })
                }
              />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button
              flex="1"
              disabled={!checkConfirmOrder}
              onPress={() => {
                ConfirmOrder();
              }}>
              Confirm Place Order
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};
export default DeliveryConfirmModel;
