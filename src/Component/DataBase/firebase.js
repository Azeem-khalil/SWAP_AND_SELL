// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { initializeFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

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
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
//export const db = getFirestore(app);
export const db = initializeFirestore(app, {
  experimentalAutoDetectLongPolling: true,
});
