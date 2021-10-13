import firebase from 'firebase/app';
import { auth } from '@libs/firebase-sdk/firebase-sdk';
import { isNullOrUndefined } from '@utils/validate-js-utils';
import { useEffect } from 'react';
import { useState } from 'react';
import { createContext, useContext, FC } from 'react';
import AuthService from './services/AuthService';
import axios from 'axios';

type AuthContextValue = {
  isAuthenticated: boolean;
  providerId: string | null;
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

  useEffect(() => {
    auth.onAuthStateChanged(async (newUser) => {
      setUser(newUser);
      const useridToken = await newUser?.getIdToken();
      axios.defaults.headers.common['Authorization'] = `Bearer ${useridToken}`;
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        get providerId() {
          return AuthService.getAuthProviderId(this.user);
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
