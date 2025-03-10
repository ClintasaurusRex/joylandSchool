import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD8TirGcX2_0X6Ox4dM7O_V_2v2G48MBm4',
  authDomain: 'joyland-prime-academy.firebaseapp.com',
  projectId: 'joyland-prime-academy',
  storageBucket: 'joyland-prime-academy.firebasestorage.app',
  messagingSenderId: '491968680811',
  appId: '1:491968680811:web:f5cc03b4def019ebb4f22e',
};

// Init Firebase :)
const app = initializeApp(firebaseConfig);

// Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;

// project unique id = joyland-prime-academy
