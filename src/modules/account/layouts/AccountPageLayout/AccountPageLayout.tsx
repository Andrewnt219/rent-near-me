import { NextLayout } from '@/next';
import DefaultLayout from '@modules/layouts/DefaultLayout';
import AuthGuard from '@modules/user-auth/utils/AuthGuard/AuthGuard';
import { ReactNode } from 'react';

type AccountPageLayoutProps = {
  className?: string;
  children: ReactNode;
};

const AccountPageLayout: NextLayout<AccountPageLayoutProps> = ({
  className,
  children,
}) => {
  return (
    <AuthGuard promptLogin>
      <div className={className} tw="max-w-5xl mt-xl mx-auto">
        {children}
      </div>
    </AuthGuard>
  );
};

AccountPageLayout.getLayout = (page: ReactNode) => {
  const inner = <AccountPageLayout>{page}</AccountPageLayout>;
  return DefaultLayout.getLayout(inner);
};

export default AccountPageLayout;
