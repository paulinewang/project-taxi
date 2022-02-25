import "firebase/compat/auth";
import firebase from "firebase/compat/app";

const firebaseConfig = {
  apiKey: "AIzaSyARl7ImqyHzciv2xZe_PNlUXs0ACdxeHbY",
  authDomain: "project-taxi-8a2bf.firebaseapp.com",
  databaseURL:
    "https://project-taxi-8a2bf-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "project-taxi-8a2bf",
  storageBucket: "project-taxi-8a2bf.appspot.com",
  messagingSenderId: "529990881670",
  appId: "1:529990881670:web:c3b73b56fbe6e27b849c07",
};

let provider: any;

export const initFirebase = () => {
  firebase.initializeApp(firebaseConfig);

  provider = new firebase.auth.GoogleAuthProvider();

  provider.setCustomParameters({ prompt: "select_account" });
};

export const signInWithGoogle = () => {
  if (!provider) {
    return console.error("No provider given.");
  }
  firebase.auth().signInWithPopup(provider);
};
