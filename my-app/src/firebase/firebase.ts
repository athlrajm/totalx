import firebase from 'firebase/compat/app'; 
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyAk4T3mNk2RwSqadsUnk5I_yGyhlgjmEbo",
  authDomain: "login-32923.firebaseapp.com",
  projectId: "login-32923",
  storageBucket: "login-32923.appspot.com",
  messagingSenderId: "544309878676",
  appId: "1:544309878676:web:c3d449535432cc8ea4b981",
  measurementId: "G-ZW7YD11E3B"
};


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export default firebase;
