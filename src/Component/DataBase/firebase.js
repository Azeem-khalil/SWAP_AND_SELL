// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBHKqax2m_lB4DZnoP_WBfsWER2QIgFL3c',
  authDomain: 'database-a86a6.firebaseapp.com',
  projectId: 'database-a86a6',
  storageBucket: 'database-a86a6.appspot.com',
  messagingSenderId: '130957528820',
  appId: '1:130957528820:web:67a1dbef4bb2415e9bd8a1',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

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
