import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import UploadImage from '../Component/UploadImage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Fab, Heading } from 'native-base';
import { useNavigation } from '@react-navigation/native';

export default function Profile() {
  const navigation = useNavigation();
  return (
    <View>
      <View style={styles.container}>
        <Fab
          renderInPortal={false}
          shadow={2}
          placement="top-right"
          size="sm"
          bg={'#7e22ce'}
          _pressed={{ bg: '#a78bfa' }}
          onPress={() => navigation.navigate('Edit_Profile')}
          icon={<Icon size={20} color={'#ffffff'} name="account-edit" />}
        />
        <UploadImage />
        <Heading style={{ marginVertical: 20, fontSize: 16 }}>
          Welcome, FuzzySid
        </Heading>
      </View>
      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <Icon name="map-marker-radius" color="#7e22ce" size={20} />
          <Text style={{ color: '#777777', marginLeft: 20 }}>
            Kolkata, India
          </Text>
        </View>
        <View style={styles.row}>
          <Icon name="phone" color="#7e22ce" size={20} />
          <Text style={{ color: '#777777', marginLeft: 20 }}>
            +91-900000009
          </Text>
        </View>
        <View style={styles.row}>
          <Icon name="email" color="#7e22ce" size={20} />
          <Text style={{ color: '#777777', marginLeft: 20 }}>
            john_doe@email.com
          </Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 50,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
});
