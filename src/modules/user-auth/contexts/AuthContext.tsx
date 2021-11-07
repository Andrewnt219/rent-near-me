import useSWR from 'swr';
import firebase from 'firebase/app';
import { auth } from '@libs/firebase-sdk/firebase-sdk';
import { isNullOrUndefined } from '@utils/validate-js-utils';
import { useEffect, useMemo } from 'react';
import { useState } from 'react';
import { createContext, useContext, FC } from 'react';
import AuthService from '@services/AuthService';
import type { ApiResult_User_Profile_GET } from '@pages/api/user/profile/[uid]';
import type Profile from '@models/api/entities/Profile/Profile';
import { updateResponseData } from '@utils/api-responses';

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
  const [user, setUser] = useState<firebase.User | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged(async (newUser) => {
      await AuthService.updateRequestAuthorizationHeader(newUser);
      setUser(newUser);
      setIsReady(true);
    });
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      isAuthReady: isReady,
      user,
      effectiveProvider: AuthService.getEffectiveAuthProvider(user),
      isAuthenticated: !isNullOrUndefined(user),
    }),
    [isReady, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
