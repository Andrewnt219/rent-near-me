import { supabase } from '@libs/supabase/supabase-utils';
import Account from '@modules/Account';
import Auth from '@modules/Auth';
import { Session } from '@supabase/supabase-js';
import React, { useEffect, useState } from 'react';

export default function Home() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      {!session ? (
        <Auth />
      ) : (
        <Account key={session.user?.id} session={session} />
      )}
    </div>
  );
}
