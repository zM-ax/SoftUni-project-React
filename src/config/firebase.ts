import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAJelnfA0J52iA0CPXdriy_mJoYHK2o9yM",
  authDomain: "dveshepibrashno.firebaseapp.com",
  projectId: "dveshepibrashno",
  storageBucket: "dveshepibrashno.firebasestorage.app",
  messagingSenderId: "85410979193",
  appId: "1:85410979193:web:402c282011906a56e863a8",
  measurementId: "G-KQMV877BML"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
 