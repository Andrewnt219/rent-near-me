import { FC } from 'react';
import { useAuth } from '@modules/user-auth/contexts/AuthContext';
import UnauthenticatedPrompt from '../../components/UnauthenticatedPrompt';
import EmailUnverifiedPrompt from '../../components/EmailUnverifiedPrompt';

type AuthGuardProps = {
  emailVerified?: boolean;
};

const AuthGuard: FC<AuthGuardProps> = ({ children, emailVerified = false }) => {
  const { user } = useAuth();

  if (!user) return <UnauthenticatedPrompt />;

  if (emailVerified && !user.emailVerified) return <EmailUnverifiedPrompt />;

  return <>{children}</>;
};

export default AuthGuard;
