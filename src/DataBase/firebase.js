// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
require('firebase/auth');
//import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAroysVfwB_bSNtSDwdmGUdT52tEibxcn0',
  authDomain: 'swap-and-sell-34831.firebaseapp.com',
  projectId: 'swap-and-sell-34831',
  storageBucket: 'swap-and-sell-34831.appspot.com',
  messagingSenderId: '871388491550',
  appId: '1:871388491550:web:76cbc090b0f625084be30f',
  measurementId: 'G-XS5XWHE1QS',
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase);
//const analytics = getAnalytics(firebase);
//firebase.initializeApp(firebaseConfig);
//const app = initializeApp(firebaseConfig);

export default firebase;
