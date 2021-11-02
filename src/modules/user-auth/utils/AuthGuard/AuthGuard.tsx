import { FC, ReactNode } from 'react';
import { useAuth } from '@modules/user-auth/contexts/AuthContext';
import DefaultUnauthenticatedPrompt from '../../components/DefaultUnauthenticatedPrompt';
import DefaultEmailUnverifiedPrompt from '../../components/DefaultEmailUnverifiedPrompt';

type AuthGuardProps = {
  emailVerified?: boolean;
  renderUnauthenticated?: ReactNode;
  renderEmailUnverified?: ReactNode;
};

const AuthGuard: FC<AuthGuardProps> = ({
  children,
  emailVerified = false,
  renderUnauthenticated = <DefaultUnauthenticatedPrompt />,
  renderEmailUnverified = <DefaultEmailUnverifiedPrompt />,
}) => {
  const { user } = useAuth();

  if (!user) return <>{renderUnauthenticated}</>;

  if (emailVerified && !user.emailVerified) return <>{renderEmailUnverified}</>;

  return <>{children}</>;
};

export default AuthGuard;
