import { supabase } from '@libs/supabase';
import RegisterForm from '@models/RegisterForm';
import { ApiPostResult_UserRegister } from '@pages/api/user/register';
import axios from 'axios';

export default class AuthService {
  static async getCurrentUser() {
    return supabase.auth.user();
  }

  static async registerWithEmail(formData: RegisterForm) {
    const response = await axios.post<ApiPostResult_UserRegister>(
      '/api/user/register',
      formData
    );
    return response.data;
  }

  static async signInWithEmail(email: string, password: string) {
    const { user, session, error } = await supabase.auth.signIn({
      email,
      password,
    });
    if (error) throw error;
    return { user, session };
  }

  static async signInWithGoogle() {
    const { user, session, error } = await supabase.auth.signIn({
      provider: 'google',
    });
    if (error) throw error;
    return { user, session };
  }

  static async signInWithFacebook() {
    const { user, session, error } = await supabase.auth.signIn({
      provider: 'facebook',
    });
    if (error) throw error;
    return { user, session };
  }

  static async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }
}
