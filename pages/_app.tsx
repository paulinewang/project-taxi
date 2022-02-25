import '../styles/globals.css'
import type { AppProps } from 'next/app'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyARl7ImqyHzciv2xZe_PNlUXs0ACdxeHbY",
  authDomain: "project-taxi-8a2bf.firebaseapp.com",
  databaseURL: "https://project-taxi-8a2bf-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "project-taxi-8a2bf",
  storageBucket: "project-taxi-8a2bf.appspot.com",
  messagingSenderId: "529990881670",
  appId: "1:529990881670:web:c3b73b56fbe6e27b849c07"
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
console.log(auth);

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

function MyApp({ Component, pageProps }: AppProps) {
  return <Component firebase={firebase} {...pageProps} />
}

export default MyApp
