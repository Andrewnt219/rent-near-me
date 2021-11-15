import DefaultLayout, {
  getDefaultLayout,
} from '@modules/layouts/DefaultLayout';
import AuthGuard from '@modules/user-auth/utils/AuthGuard/AuthGuard';
import { FC, ReactNode } from 'react';

type AccountPageLayoutProps = {
  className?: string;
  children: ReactNode;
};

export default function AccountPageLayout({
  className,
  children,
}: AccountPageLayoutProps) {
  return (
    <AuthGuard promptLogin>
      <div className={className} tw="max-w-5xl mt-xl mx-auto">
        {children}
      </div>
    </AuthGuard>
  );
}

export const getAccountPageLayout = (page: ReactNode) => {
  const inner = <AccountPageLayout>{page}</AccountPageLayout>;
  return getDefaultLayout(inner);
};
