import axios from 'axios';
import {
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  browserLocalPersistence,
  browserSessionPersistence,
  signOut,
} from 'firebase/auth';
import RegisterForm from '@models/RegisterForm';
import { ApiPostResult_UserRegister } from '@pages/api/user/register';
import { auth } from '@libs/firebase-sdk/firebase-sdk';

export default class AuthService {
  static async registerWithEmail(formData: RegisterForm) {
    const response = await axios.post<ApiPostResult_UserRegister>(
      '/api/user/register',
      formData
    );
    return response.data;
  }

  static async signInWithEmail(
    email: string,
    password: string,
    keepLogIn: boolean
  ) {
    const persistence = keepLogIn
      ? browserLocalPersistence
      : browserSessionPersistence;
    await setPersistence(auth, persistence);
    await signInWithEmailAndPassword(auth, email, password);
  }

  static async signInWithGoogle() {
    await signInWithPopup(auth, new GoogleAuthProvider());
  }

  static async signInWithFacebook() {
    await signInWithPopup(auth, new FacebookAuthProvider());
  }

  static async signOut() {
    await signOut(auth);
  }
}
