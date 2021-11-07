import useSWR, { KeyedMutator } from 'swr';
import firebase from 'firebase/app';
import { auth } from '@libs/firebase-sdk/firebase-sdk';
import { isNullOrUndefined } from '@utils/validate-js-utils';
import { useEffect, useMemo } from 'react';
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
  profile: Profile | null;
  mutateProfile: KeyedMutator<ApiResult_User_Profile_GET>;
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

  const {
    data: profileResponse,
    mutate: mutateProfileResponse,
    isValidating: isValidating,
  } = useSWR<ApiResult_User_Profile_GET>(
    user ? `/api/user/profile/${user.uid}` : null
  );

  const value = useMemo<AuthContextValue>(
    () => ({
      isAuthReady:
        isReady && (!isNullOrUndefined(profileResponse) || !isValidating),
      user,
      profile: profileResponse?.data ?? null,
      mutateProfile: mutateProfileResponse,
      get effectiveProvider() {
        return AuthService.getEffectiveAuthProvider(this.user);
      },
      get isAuthenticated() {
        return !isNullOrUndefined(this.user);
      },
    }),
    [isReady, profileResponse, isValidating, user, mutateProfileResponse]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
