import PaymentSettingPageLayout from '@modules/account/layouts/PaymentSettingPageLayout/PaymentSettingPageLayout';
import { ReactNode } from 'react';

type Props = {
  className?: string;
};
export default function PayoutMethodsPage({ className }: Props) {
  return (
    <div className={className} tw="">
      <h1 tw="text-hero">Payout</h1>
    </div>
  );
}

PayoutMethodsPage.getLayout = (page: ReactNode) => {
  return <PaymentSettingPageLayout>{page}</PaymentSettingPageLayout>;
};
