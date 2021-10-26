import DefaultLayout from '@modules/layouts/DefaultLayout';
import { PropsWithChildren } from 'react';

type Props = {
  className?: string;
};
function SettingsPageLayout({
  className,
  children,
  ...props
}: PropsWithChildren<Props>) {
  return (
    <DefaultLayout>
      <div className={className} tw="max-w-5xl mt-2xl mx-auto">
        {children}
      </div>
    </DefaultLayout>
  );
}

export default SettingsPageLayout;
