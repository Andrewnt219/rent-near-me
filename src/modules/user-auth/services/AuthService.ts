import { auth } from '@libs/firebase-sdk/firebase-sdk';
import ChangePasswordFormModel from '@modules/account/components/ChangePasswordForm/ChangePasswordFormModel';
import RegisterFormModel from '@modules/user-auth/components/RegisterForm/RegisterFormModel';
import { ApiPostResult_User_ChangePassword } from '@pages/api/user/changePassword';
import { ApiPostResult_User_Register } from '@pages/api/user/register';
import axios from 'axios';
import firebase from 'firebase/app';

export default class AuthService {
  static async registerWithEmail(formData: RegisterFormModel) {
    const response = await axios.post<ApiPostResult_User_Register>(
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

  static getAuthProviderId(user = auth.currentUser) {
    if (user?.providerId !== 'firebase') {
      return user?.providerId ?? null;
    }
    // User can sign-in with multiple providers at the same time
    // The first one in the provider list is the most recently used
    return user?.providerData.some((p) => p?.providerId === 'password')
      ? 'password'
      : user?.providerData[0]?.providerId ?? null;
  }

  static async changePassword(formData: ChangePasswordFormModel) {
    const { oldPassword, newPassword, confirmNewPassword, email } = formData;
    if (newPassword !== confirmNewPassword)
      throw Error('New Password and Confirm New Password do not match');
    await AuthService.reauthenticate(email, oldPassword);
    await auth.currentUser?.updatePassword(newPassword);
    // await is intentionally omitted since we don't need the response
    axios.post<ApiPostResult_User_ChangePassword>(
      '/api/user/changePassword',
      formData
    );
  }

  private static async reauthenticate(email: string, password: string) {
    const user = auth.currentUser;
    const providerId = AuthService.getAuthProviderId();
    switch (providerId) {
      case 'password': {
        await user?.reauthenticateWithCredential(
          firebase.auth.EmailAuthProvider.credential(email, password)
        );
        break;
      }
      case 'google.com': {
        await user?.reauthenticateWithPopup(
          new firebase.auth.GoogleAuthProvider()
        );
        break;
      }
      case 'facebook.com': {
        await user?.reauthenticateWithPopup(
          new firebase.auth.FacebookAuthProvider()
        );
        break;
      }
    }
  }
}
