import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCqq04iKVNXq9rFtY-fBbILpPB9_9Amml0",
  authDomain: "headerscenterv20.firebaseapp.com",
  projectId: "headerscenterv20",
  storageBucket: "headerscenterv20.appspot.com",
  messagingSenderId: "986810362554",
  appId: "1:986810362554:web:633f7a755c7ff8f8583083",
  measurementId: "G-ABCDEF123"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Enable offline persistence (will silently fail if not supported)
try {
  enableIndexedDbPersistence(db).catch((err) => {
    if (err.code === 'failed-precondition') {
      console.log('Multiple tabs open, persistence can only be enabled in one tab at a time.');
    } else if (err.code === 'unimplemented') {
      console.log('The current browser does not support all of the features required to enable persistence');
    }
  });
} catch (error) {
  console.log('Error enabling persistence:', error);
}

export { app, auth, db };