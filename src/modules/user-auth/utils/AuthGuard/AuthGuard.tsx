import { FC, ReactNode, useEffect } from 'react';
import { useAuth } from '@modules/user-auth/contexts/AuthContext';
import DefaultUnauthenticatedPrompt from '../../components/DefaultUnauthenticatedPrompt';
import DefaultEmailUnverifiedPrompt from '../../components/DefaultEmailUnverifiedPrompt';
import { useModals } from '@ui/Modal/ModalContext';

type AuthGuardProps = {
  emailVerified?: boolean;
  promptLogin?: boolean;
  renderedUnauthenticated?: ReactNode;
  renderedEmailUnverified?: ReactNode;
};

const AuthGuard: FC<AuthGuardProps> = ({
  children,
  emailVerified = false,
  promptLogin = false,
  renderedUnauthenticated = <DefaultUnauthenticatedPrompt />,
  renderedEmailUnverified = <DefaultEmailUnverifiedPrompt />,
}) => {
  const { isAuthReady, user } = useAuth();
  const { loginModal } = useModals();

  useEffect(() => {
    if (promptLogin && isAuthReady && !user) {
      loginModal.show();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthReady, user]);

  if (!user) return <>{renderedUnauthenticated}</>;

  if (emailVerified && !user.emailVerified)
    return <>{renderedEmailUnverified}</>;

  return <>{children}</>;
};

export default AuthGuard;
