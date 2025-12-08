import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCXsyX1VGK1qhnffwzxch_U3UQJ7OPKrqQ",
  authDomain: "dve-shepi-brashno.firebaseapp.com",
  projectId: "dve-shepi-brashno",
  storageBucket: "dve-shepi-brashno.firebasestorage.app",
  messagingSenderId: "849269030376",
  appId: "1:849269030376:web:0edbeb97b636ce14e0785d",
  measurementId: "G-191ET32PJS"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
 