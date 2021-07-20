import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebase-sdk-config.json';

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
