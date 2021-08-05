import DefaultLayout from '@layouts/DefaultLayout';
import PaymentSettingLayout from '@modules/account/layouts/PaymentSettingLayout/PaymentSettingLayout';
import { ReactNode } from 'react';

type Props = {
  className?: string;
};
export default function PayoutMethodsPage({ className, ...props }: Props) {
  return (
    <div className={className} tw="">
      <h1 tw="text-hero">Payout</h1>
    </div>
  );
}

PayoutMethodsPage.getLayout = (page: ReactNode) => {
  return (
    <DefaultLayout>
      <PaymentSettingLayout>{page}</PaymentSettingLayout>
    </DefaultLayout>
  );
};
