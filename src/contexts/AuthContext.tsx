import { auth } from '@libs/firebase-sdk/firebase-sdk';
import { isNullOrUndefined } from '@utils/validate-js-utils';
import { onAuthStateChanged, User } from 'firebase/auth';
import { useEffect } from 'react';
import { useState } from 'react';
import { createContext, useContext, FC } from 'react';

type AuthContextValue = {
  isAuthenticated: boolean;
  user: User | null;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) throw Error('No matching AuthProvider');
  return authContextValue as AuthContextValue;
};

export const AuthProvider: FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, setUser);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        get isAuthenticated() {
          return !isNullOrUndefined(this.user);
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
