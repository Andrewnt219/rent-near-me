import firebase from 'firebase/app';
import { auth } from '@libs/firebase-sdk/firebase-sdk';
import { isNullOrUndefined } from '@utils/validate-js-utils';
import { useEffect } from 'react';
import { useState } from 'react';
import { createContext, useContext, FC } from 'react';
import AuthService from '@services/AuthService';

type AuthContextValue = {
  isAuthReady: boolean;
  isAuthenticated: boolean;
  effectiveProvider: string | null;
  user: firebase.User | null;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) throw Error('No matching AuthProvider');
  return authContextValue as AuthContextValue;
};

export const AuthProvider: FC = ({ children }) => {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged(async (newUser) => {
      setUser(newUser);
      setIsReady(true);
      await AuthService.updateRequestAuthorizationHeader(newUser);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthReady: isReady,
        user,
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
