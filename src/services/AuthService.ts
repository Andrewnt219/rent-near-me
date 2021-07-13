import { supabase } from '@libs/supabase';
import RegisterForm from '@models/RegisterForm';
import { Result } from '@utils/api-responses';

export default class AuthService {
  static async getCurrentUser() {
    return supabase.auth.user();
  }

  static async registerWithEmail(data: RegisterForm) {
    const response = await fetch('/api/user/register', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const responseData: Result = await response.json();
    if (!response.ok) {
      throw Error(responseData.error?.message);
    }
    return responseData;
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
