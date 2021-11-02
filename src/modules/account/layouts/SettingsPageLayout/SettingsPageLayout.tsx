import DefaultLayout from '@modules/layouts/DefaultLayout';
import AuthGuard from '@modules/user-auth/utils/AuthGuard/AuthGuard';
import { FC } from 'react';

type SettingsPageLayoutProps = {
  className?: string;
};

const SettingsPageLayout: FC<SettingsPageLayoutProps> = ({
  className,
  children,
}) => (
  <DefaultLayout>
    <AuthGuard>
      <div className={className} tw="max-w-5xl mt-2xl mx-auto">
        {children}
      </div>
    </AuthGuard>
  </DefaultLayout>
);

export default SettingsPageLayout;
