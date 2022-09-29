// components/dashboard.js
import React, { Component } from 'react';
import { StyleSheet, View, Text, ToastAndroid, Button } from 'react-native';
import firebase from '../DataBase/firebase';
import { getAuth, signOut } from 'firebase/auth';

//import auth from '@react-native-firebase/auth';
import AppStackNav from '../navigations/AppStackNav';
console.log(auth);
require('firebase/auth');
const auth = getAuth(firebase);
//const user = auth.currentUser;
export default class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      displayName: '',
      uid: '',
    };
  }
  signOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log('Sign-out successful.');
        ToastAndroid.showWithGravity(
          'User Sign-out successfully!',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
        );
        this.props.navigation.navigate('Login');
      })
      .catch(error => {
        console.log('Sign-out error.!!!!!!!!!!!!!!!!!!!');
        ToastAndroid.showWithGravity(
          'User Sign-out error!',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
        );
        //this.props.navigation.navigate('Login');
      });
    // firebase
    //   .auth()
    //   .signOut()
    //   .then(() => {
    //     this.props.navigation.navigate('Login');
    //   })
    //   .catch(error => this.setState({ errorMessage: error.message }));
  };
  render() {
    console.log('befr.!!!!!!!!!!!!!!!!!!!');
    if (auth.currentUser) {
      console.log('after.!!!!!!!!!!!!!!!!!!!');

      // The user object has basic properties such as display name, email, etc.
      // const displayName = auth.currentUser.displayName;
      // The user's ID, unique to the Firebase project. Do NOT use
      // this value to authenticate with your backend server, if
      // you have one. Use User.getToken() instead.
      this.state = {
        displayName: auth.currentUser.displayName,
        uid: auth.currentUser.uid,
      };
    }
    return (
      <View style={styles.container}>
        {/* <AppStackNav /> */}
        <Text style={styles.textStyle}>
          Hello, {this.state.uid + this.state.displayName}
        </Text>
        <Button color="#3740FE" title="Logout" onPress={() => this.signOut()} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 35,
    backgroundColor: '#fff',
  },
  textStyle: {
    fontSize: 15,
    marginBottom: 20,
  },
});
