import PaymentSettingPageLayout from '@modules/account/layouts/PaymentSettingPageLayout/PaymentSettingPageLayout';
import React, { ReactNode } from 'react';

type Props = {
  className?: string;
};
export default function TaxInfoPage({ className }: Props) {
  return (
    <div className={className} tw="">
      <h1 tw="text-hero">Taxes</h1>
    </div>
  );
}

TaxInfoPage.getLayout = (page: ReactNode) => {
  return <PaymentSettingPageLayout>{page}</PaymentSettingPageLayout>;
};
