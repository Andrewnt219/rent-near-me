import { supabase } from '@libs/supabase';
import Account from '@modules/Account';
import Login from '@modules/LogIn';
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
    <div className="container">
      {!session ? (
        <Login />
      ) : (
        <Account key={session.user?.id} session={session} />
      )}
    </div>
  );
}
