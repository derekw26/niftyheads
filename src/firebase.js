import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import { getAuth } from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyApA2fPuZxsMb5xZ9H8DCxDAlR1HdW5rTo",
  authDomain: "niftyheads-b7011.firebaseapp.com",
  projectId: "niftyheads-b7011",
  storageBucket: "niftyheads-b7011.appspot.com",
  messagingSenderId: "543508334522",
  appId: "1:543508334522:web:fca7dfd7ce675ca2cb7f83"
};


const app = firebase.initializeApp(firebaseConfig)

try {
  app();
} catch (err) {
  if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error', err.stack);
  }
}

export const auth = getAuth(app);

const fire = firebase;
export default fire;
