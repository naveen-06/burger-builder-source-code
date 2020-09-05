import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD5Stsji7NgnAHZYFqFkE-SWgDI8bmKCp4",
  authDomain: "my-burger-8b19a.firebaseapp.com",
  databaseURL: "https://my-burger-8b19a.firebaseio.com",
  projectId: "my-burger-8b19a",
  storageBucket: "my-burger-8b19a.appspot.com",
  messagingSenderId: "629828177903",
  appId: "1:629828177903:web:03ae6c68b4b3209aa9b01a",
  measurementId: "G-2PES8W5NZM"
};

firebase.initializeApp(firebaseConfig);

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters( { prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export default firebase;