import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyD2FKHqkEift-jMpgiEQ1COeJoNNRrJzTE',
  authDomain: 'solumon-d37c6.firebaseapp.com',
  projectId: 'solumon-d37c6',
  storageBucket: 'solumon-d37c6.appspot.com',
  messagingSenderId: '818896635270',
  appId: '1:818896635270:web:1cac02e0fc0881ca8f5807',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { app, auth, provider, db };
