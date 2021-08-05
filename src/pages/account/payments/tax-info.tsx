import DefaultLayout from '@layouts/DefaultLayout';
import PaymentSettingLayout from '@modules/account/layouts/PaymentSettingLayout/PaymentSettingLayout';
import React, { ReactNode } from 'react';

type Props = {
  className?: string;
};
export default function TaxInfoPage({ className, ...props }: Props) {
  return (
    <div className={className} tw="">
      <h1 tw="text-hero">Taxes</h1>
    </div>
  );
}

TaxInfoPage.getLayout = (page: ReactNode) => {
  return (
    <DefaultLayout>
      <PaymentSettingLayout>{page}</PaymentSettingLayout>
    </DefaultLayout>
  );
};
