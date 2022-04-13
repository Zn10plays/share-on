import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getAuth, connectAuthEmulator } from 'firebase/auth';

const app = initializeApp({
  "apiKey": "AIzaSyDsQodFnEa4OxE5qO9WrWTh7WH0iYC_6mY",
  "authDomain": "share-on-fc972.firebaseapp.com",
  "projectId": "share-on-fc972",
  "storageBucket": "share-on-fc972.appspot.com",
  "messagingSenderId": "804479235627",
  "appId": "1:804479235627:web:2fc5690b078dc1600d5c6e",
  "measurementId": "G-ML75KEQH3R"
})

const db = getFirestore(app);
const auth = getAuth(app);

connectAuthEmulator(auth, 'http://localhost:5555')
connectFirestoreEmulator(db, 'localhost', 8080)

export { db, auth }
export default app