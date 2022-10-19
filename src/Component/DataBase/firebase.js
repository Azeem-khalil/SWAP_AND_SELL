// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// import Product from '../data/Product';

// import * as firebase from 'firebase';
// import '@firebase/auth';
// import '@firebase/firestore';
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

// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }

export const firebase = initializeApp(firebaseConfig);
export const db = getFirestore(firebase);
console.log('firebase name ' + db.name);
export const auth = getAuth(firebase);
//const analytics = getAnalytics(firebase);
//firebase.initializeApp(firebaseConfig);
//const app = initializeApp(firebaseConfig);

// async function fun() {
//   // for (let i = 0; i < Product.length; i++)
//   console.log('Document ');
//   let i = 0;
//   try {
//     const docRef = await addDoc(collection(db, 'Shoes'), {
//       _id: Product[i]._id,
//       Name: Product[i].Name,
//       Image: Product[i].Image,
//       description: Product[i].description,
//       price: Product[i].price,
//       countInStock: Product[i].countInStock,
//       rating: Product[i].rating,
//       numReview: Product[i].numReview,
//     });

//     console.log('Document written with ID: ', docRef.id);
//   } catch (e) {
//     console.error('Error adding document: ', e);
//   }
// }
