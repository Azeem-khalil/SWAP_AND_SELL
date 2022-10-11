// App.js
import * as React from 'react';
import { NativeBaseProvider, StatusBar } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './src/screens/Login';
import Signup from './src/screens/Signup';

import BottomNav from './src/Component/Navigation/BottomNav';

require('firebase/auth');
// const auth = getAuth(firebase);
// console.log(auth);
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <StatusBar hidden={false} />
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShow: () => false }}>
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
            name={'BottomNav'}
            component={BottomNav}
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
