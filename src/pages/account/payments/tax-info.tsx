import PaymentSettingPageLayout from '@modules/account/layouts/PaymentSettingPageLayout/PaymentSettingPageLayout';
import Text from '@ui/Text/Text';
import React, { ReactNode } from 'react';

type Props = {
  className?: string;
};
export default function TaxInfoPage({ className }: Props) {
  return (
    <div className={className} tw="">
      <Text component="h2" variant="h3">
        Taxes
      </Text>
    </div>
  );
}

TaxInfoPage.getLayout = (page: ReactNode) => {
  return <PaymentSettingPageLayout>{page}</PaymentSettingPageLayout>;
};
