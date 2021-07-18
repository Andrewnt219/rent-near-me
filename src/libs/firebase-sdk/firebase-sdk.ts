import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import firebaseConfig from './firebase-sdk-config.json';

if (getApps().length === 0) {
  initializeApp(firebaseConfig);
}

const firebaseApp = getApp();

export const auth = getAuth(firebaseApp);
export default firebaseApp;
