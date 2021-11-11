import firebase from 'firebase/app';
import { auth } from '@libs/firebase-sdk/firebase-sdk';
import { isNullOrUndefined } from '@utils/validate-js-utils';
import { useEffect, useMemo } from 'react';
import { useState } from 'react';
import { createContext, useContext, FC } from 'react';
import AuthService from '@services/AuthService';

type AuthContextValue = {
  isAuthReady: boolean;
  isAuthenticated: boolean;
  effectiveProvider: string | null;
  user: firebase.User | null;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (authContextValue === undefined) throw Error('No matching AuthProvider');
  return authContextValue;
};

export const AuthProvider: FC = ({ children }) => {
  const [user, setUser] = useState<firebase.User | null | undefined>(undefined);

  useEffect(() => {
    auth.onAuthStateChanged(setUser);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      isAuthReady: user !== undefined,
      user: user ?? null,
      effectiveProvider: AuthService.getEffectiveAuthProvider(user),
      isAuthenticated: !isNullOrUndefined(user),
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
