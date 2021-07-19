import firebase from 'firebase/app';
import axios from 'axios';
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
    const persistence =
      firebase.auth.Auth.Persistence[keepLogIn ? 'LOCAL' : 'SESSION'];
    await auth.setPersistence(persistence);
    await auth.signInWithEmailAndPassword(email, password);
  }

  static async signInWithGoogle() {
    await auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  static async signInWithFacebook() {
    await auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
  }

  static async signOut() {
    await auth.signOut();
  }
}
