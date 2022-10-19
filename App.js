// App.js
import * as React from 'react';
import { NativeBaseProvider, StatusBar } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './src/screens/Login';
import Signup from './src/screens/Signup';

import BottomNav from './src/Component/Navigation/BottomNav';
import { firebase, db, auth } from './src/Component/DataBase/firebase';
import { getAuth } from 'firebase/auth';
import Product from './src/Component/data/Product';
import Home from './src/screens/Home';
import MainPage from './src/mainScreens/MainPage';
import Mainnavigation from './src/Component/Navigation/Mainnavigation';
// console.log(auth);
const Stack = createNativeStackNavigator();
export default function App() {
  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState(null);
  // React.useEffect(() => {
  //   const usersRef = firebase.firestore().collection('users');
  //   auth.onAuthStateChanged(user => {
  //     if (user) {
  //       usersRef
  //         .doc(user.uid)
  //         .get()
  //         .then(document => {
  //           const userData = document.data();
  //           setLoading(false);
  //           setUser(userData);
  //         })
  //         .catch(error => {
  //           setLoading(false);
  //         });
  //     } else {
  //       setLoading(false);
  //     }
  //   });
  // }, []);

  // if (loading) {
  //   return <></>;
  // }
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <StatusBar hidden={false} />
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShown: false }}>
          <Stack.Screen
            options={{ headerShown: false }}
            name={'Login'}
            component={Login}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name={'Signup'}
            component={Signup}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name={'Mainnavigation'}
            component={Mainnavigation}
          />
        </Stack.Navigator>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}

// const [userData, setUserData] = useState([]);
// const getEntries = async () => {
//   await AsyncStorage.setItem('key', 'val1');
//   const value = await AsyncStorage.getItem('key');
//   setUserData(AsyncStorage.getItem('LOGIN_TOKEN'));
//   console.log(value);
// };

// useEffect(() => {
//   getEntries();
// }, []);
// console.log(userData);

// import AuthNav from './src/navigations/AuthNav';
// import AppStackNav from './src/navigations/AppStackNav';
//import { AsyncStorage } from '@react-native-async-storage/async-storage';

// function MyStack() {
//   return (
//     <AuthNav />
//     //<AppStackNav />
//   );
//   // if (auth.currentUser) {
//   //   return (
//   //     // <AuthNav />
//   //     <AppStackNav />
//   //   );
//   // } else {
//   //   return (
//   //     <AuthNav />
//   //     //<AppStackNav />
//   //   );
//   // }
// }
