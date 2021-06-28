import AuthService from '@services/AuthService';
import UserService from '@services/UserService';
import { Session } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

export default function Account({ session }: { session: Session }) {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState<string | null>(null);
  const [website, setWebsite] = useState<string | null>(null);
  const [avatar_url, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      const user = await AuthService.getCurrentUser();

      const { data } = await UserService.getProfile(user?.id);

      if (data) {
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({
    username,
    website,
    avatar_url,
  }: {
    username: string | null;
    website: string | null;
    avatar_url: string | null;
  }) {
    try {
      setLoading(true);
      const user = await AuthService.getCurrentUser();

      const updates = {
        id: user?.id,
        username,
        website,
        avatar_url,
        updated_at: new Date(),
      };

      await UserService.upsertProfile(user?.id, updates);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-widget">
      <div>
        <label htmlFor="email" className="mr-2">
          Email:
        </label>
        <span>{session.user?.email}</span>
      </div>
      <div>
        <label htmlFor="username" className="mr-2">
          Name:
        </label>
        <input
          id="username"
          type="text"
          value={username ?? ''}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="website" className="mr-2">
          Website:
        </label>
        <input
          id="website"
          type="website"
          value={website ?? ''}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <button
        onClick={() => updateProfile({ username, website, avatar_url })}
        disabled={loading}
      >
        {loading ? 'Loading' : 'Update'}
      </button>
      <br />
      <button onClick={() => AuthService.signOut()}>Sign Out</button>
    </div>
  );
}
