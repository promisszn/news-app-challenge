// import firebase from "firebase/app";
// import "firebase/auth";
// import "firebase/firestore";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyATH3rXi0p1gL6ZD_jMGPeZ_q7EYQpoxrE",
    authDomain: "newsapp-ea1e2.firebaseapp.com",
    projectId: "newsapp-ea1e2",
    storageBucket: "newsapp-ea1e2.appspot.com",
    messagingSenderId: "764349589019",
    appId: "1:764349589019:web:0aaac845441250d1e9fabe"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { timestamp };
export default firebaseApp.firestore();