import useSWR from 'swr';
import firebase from 'firebase/app';
import { auth } from '@libs/firebase-sdk/firebase-sdk';
import { isNullOrUndefined } from '@utils/validate-js-utils';
import { useEffect } from 'react';
import { useState } from 'react';
import { createContext, useContext, FC } from 'react';
import AuthService from '@services/AuthService';
import type { ApiResult_User_Profile_GET } from '@pages/api/user/profile/[uid]';
import type Profile from '@models/api/entities/Profile/Profile';

type AuthContextValue = {
  isAuthReady: boolean;
  isAuthenticated: boolean;
  effectiveProvider: string | null;
  user: firebase.User | null;
  profile: Profile | undefined;
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

  const { data: profile } = useSWR<ApiResult_User_Profile_GET>(
    user ? `/api/user/profile/${user.uid}` : null
  );

  return (
    <AuthContext.Provider
      value={{
        isAuthReady: isReady,
        user,
        profile: profile?.data,
        get effectiveProvider() {
          return AuthService.getEffectiveAuthProvider(this.user);
        },
        get isAuthenticated() {
          return !isNullOrUndefined(this.user);
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
