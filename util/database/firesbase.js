import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'
import { firebaseConfig } from '../../config.json';

const app = initializeApp(firebaseConfig)

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth }
export default app