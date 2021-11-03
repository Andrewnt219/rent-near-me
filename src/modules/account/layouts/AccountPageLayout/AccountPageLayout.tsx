import DefaultLayout from '@modules/layouts/DefaultLayout';
import AuthGuard from '@modules/user-auth/utils/AuthGuard/AuthGuard';
import { FC } from 'react';

type AccountPageLayoutProps = {
  className?: string;
};

const AccountPageLayout: FC<AccountPageLayoutProps> = ({
  className,
  children,
}) => (
  <DefaultLayout>
    <AuthGuard promptLogin>
      <div className={className} tw="max-w-5xl mt-2xl mx-auto">
        {children}
      </div>
    </AuthGuard>
  </DefaultLayout>
);

export default AccountPageLayout;
