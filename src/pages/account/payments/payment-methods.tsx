import PaymentSettingPageLayout from '@modules/account/layouts/PaymentSettingPageLayout/PaymentSettingPageLayout';
import { ReactNode } from 'react';

type Props = {
  className?: string;
};
export default function PaymentMethodsPage({ className, ...props }: Props) {
  return (
    <div className={className} tw="">
      <h1 tw="text-hero">Payments</h1>
    </div>
  );
}

PaymentMethodsPage.getLayout = (page: ReactNode) => {
  return <PaymentSettingPageLayout>{page}</PaymentSettingPageLayout>;
};
