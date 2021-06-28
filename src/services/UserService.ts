import { supabase } from '@libs/supabase';

export default class UserService {
  private static readonly Profiles = supabase.from('profiles');

  static async getProfile(userId?: string) {
    const { data, error, status } = await UserService.Profiles.select(
      `username, website, avatar_url`
    )
      .eq('id', userId)
      .single();
    if (error && status !== 406) throw error;
    return { data, status };
  }

  static async upsertProfile(userId: string | undefined, profile: any) {
    const { data, error, status } = await UserService.Profiles.upsert(profile, {
      returning: 'minimal',
    })
      .eq('id', userId)
      .single();
    if (error) throw error;
    return { data, status };
  }
}
