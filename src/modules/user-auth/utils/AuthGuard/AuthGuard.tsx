import { FC, ReactNode, useEffect } from 'react';
import { useAuth } from '@modules/user-auth/contexts/AuthContext';
import DefaultUnauthenticatedPrompt from '../../components/DefaultUnauthenticatedPrompt';
import DefaultEmailUnverifiedPrompt from '../../components/DefaultEmailUnverifiedPrompt';
import { useLayoutModal } from '@modules/layouts/contexts/LayoutModalContext';

type AuthGuardProps = {
  emailVerified?: boolean;
  promptLogin?: boolean;
  renderUnauthenticated?: ReactNode;
  renderEmailUnverified?: ReactNode;
};

const AuthGuard: FC<AuthGuardProps> = ({
  children,
  emailVerified = false,
  promptLogin = false,
  renderUnauthenticated = <DefaultUnauthenticatedPrompt />,
  renderEmailUnverified = <DefaultEmailUnverifiedPrompt />,
}) => {
  const { ready, user } = useAuth();
  const { loginModal } = useLayoutModal();

  useEffect(() => {
    if (promptLogin && ready && !user) {
      loginModal.show();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, user]);

  if (!user) return <>{renderUnauthenticated}</>;

  if (emailVerified && !user.emailVerified) return <>{renderEmailUnverified}</>;

  return <>{children}</>;
};

export default AuthGuard;
