// components/login.js
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import firebase from '../DataBase/firebase';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

//import { AsyncStorage } from '@react-native-async-storage/async-storage';
import { AsyncStorage } from 'react-native';
//import auth from '@react-native-firebase/auth';
require('firebase/auth');
const auth = getAuth(firebase);
//const user = auth.currentUser;
export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isLoading: false,
    };
  }
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };
  userLogin = async () => {
    // await AsyncStorage.setItem('key', 'val1');
    //await AsyncStorage.setItem('LOGIN_TOKEN', 'azeem');
    if (this.state.email === '' && this.state.password === '') {
      Alert.alert('Enter details to signin!');
    } else {
      this.setState({
        isLoading: true,
      });
      signInWithEmailAndPassword(auth, this.state.email, this.state.password)
        .then(res => {
          // console.log(h);
          // history.push("/");
          AsyncStorage.setItem('LOGIN_TOKEN', 'azeem');

          console.log('User logged-in successfully!');

          this.setState({
            isLoading: false,
            email: '',
            password: '',
          });
          // console.log('That email address is invalid! OR PASWORD INCORECT!');
          ToastAndroid.showWithGravity(
            'User logged-in successfully!',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
          );
          //AsyncStorage.setItem('LOGIN_TOKEN', res);
          //localStorage
          //console.log('User ' + res);
          this.props.navigation.navigate('Dashboard');
        })
        .catch(error => {
          this.setState({
            isLoading: false,
          });
          // if (error.code === 'auth/email-already-in-use') {
          //   console.log('That email address is already in use!');
          //   ToastAndroid.showWithGravity(
          //     'Email Already exist ' + 'That email address is already in use!',
          //     ToastAndroid.LONG,
          //     ToastAndroid.BOTTOM,
          //   );
          // }
          // if (error.code === 'auth/invalid-email')

          console.log('That email address is invalid! OR PASWORD INCORECT!');
          ToastAndroid.showWithGravity(
            'That email address is invalid! OR PASWORD INCORECT!',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
          );

          this.setState({ errorMessage: error.message });
        });
    }
  };
  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.inputStyle}
          placeholder="Email"
          value={this.state.email}
          onChangeText={val => this.updateInputVal(val, 'email')}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Password"
          value={this.state.password}
          onChangeText={val => this.updateInputVal(val, 'password')}
          maxLength={15}
          secureTextEntry={true}
        />
        <Button
          color="#3740FE"
          title="Signin"
          onPress={() => this.userLogin()}
        />
        <Text
          style={styles.loginText}
          onPress={() => this.props.navigation.navigate('Signup')}>
          Don't have account? Click here to signup
        </Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 35,
    backgroundColor: '#fff',
  },
  inputStyle: {
    width: '100%',
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: 'center',
    borderColor: '#ccc',
    borderBottomWidth: 1,
  },
  loginText: {
    color: '#3740FE',
    marginTop: 25,
    textAlign: 'center',
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});
