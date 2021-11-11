import { auth } from '@libs/firebase-sdk/firebase-sdk';
import { LoginLogPayload } from '@models/LoginLogPayload';
import { ChangePasswordFormModel } from '@modules/account/components/ChangePasswordForm/ChangePasswordFormModel';
import { RegisterFormModel } from '@modules/user-auth/components/RegisterForm/RegisterFormModel';
import { ApiResult_User_ChangePassword_POST } from '@pages/api/user/changePassword';
import { ApiResult_User_Login_POST } from '@pages/api/user/login';
import { ApiResult_User_Register_POST } from '@pages/api/user/register';
import axios from 'axios';
import firebase from 'firebase/app';
import platform from 'platform';

export default class AuthService {
  static async registerWithEmail(formData: RegisterFormModel) {
    const response = await axios.post<ApiResult_User_Register_POST>(
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
    AuthService.login('password');
  }

  static async signInWithGoogle() {
    await auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
    await auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    AuthService.login('google.com');
  }

  static async signInWithFacebook() {
    await auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
    await auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
    AuthService.login('facebook.com');
  }

  static async signOut() {
    await auth.signOut();
  }

  static getEffectiveAuthProvider(user = auth.currentUser) {
    if (user?.providerId !== 'firebase') {
      return user?.providerId ?? null;
    }
    // User can sign-in with multiple providers at the same time
    // The first one in the provider list is the most recently used
    // If the user signed in with password, prioritizing password authentication
    return user?.providerData.some((p) => p?.providerId === 'password')
      ? 'password'
      : user?.providerData[0]?.providerId ?? null;
  }

  static async changePassword(formData: ChangePasswordFormModel) {
    const { email, oldPassword } = formData;
    await AuthService.reauthenticate(email, oldPassword);
    await axios.post<ApiResult_User_ChangePassword_POST>(
      '/api/user/changePassword',
      formData
    );
  }

  private static async reauthenticate(email?: string, password?: string) {
    const user = auth.currentUser;
    const providerId = AuthService.getEffectiveAuthProvider();
    switch (providerId) {
      case 'password':
        if (!email || !password) throw Error('Email and Password is required');
        await user?.reauthenticateWithCredential(
          firebase.auth.EmailAuthProvider.credential(email, password)
        );
        break;
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

  private static async login(authProvider: string) {
    const payload: LoginLogPayload = {
      uid: auth.currentUser?.uid ?? '',
      authProvider,
      browser: platform.name,
      browserVersion: platform.version,
      device: platform.product,
      deviceManufacturer: platform.manufacturer,
      os: platform.os?.toString(),
    };
    const response = await axios.post<ApiResult_User_Login_POST>(
      '/api/user/login',
      payload
    );
    return response.data;
  }
}
