import { supabase } from '@libs/supabase';

export default class AuthService {
  static async getCurrentUser() {
    return supabase.auth.user();
  }

  static async registerWithEmail(email: string, password: string) {
    const { user, session, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) throw error;
    return { user, session };
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
