import { NextLayout } from '@/next';
import AccountPageHeader from '@modules/account/components/AccountPageHeader/AccountPageHeader';
import NextLink from 'next/link';
import { ReactNode } from 'react';
import AccountPageLayout from '../AccountPageLayout/AccountPageLayout';

type PaymentSettingPageLayoutProps = {
  className?: string;
};
const PaymentSettingPageLayout: NextLayout<PaymentSettingPageLayoutProps> = ({
  className,
  children,
}) => {
  return (
    <div className={className} tw="">
      <AccountPageHeader title="Payments & payouts" />

      <ul tw="flex gap-sm">
        <NextLink href="/account/payments/payment-methods">
          <a>Payments</a>
        </NextLink>

        <NextLink href="/account/payments/payout-methods">
          <a>Payouts</a>
        </NextLink>

        <NextLink href="/account/payments/tax-info">
          <a>Taxes</a>
        </NextLink>
      </ul>

      {children}
    </div>
  );
};

PaymentSettingPageLayout.getLayout = (page: ReactNode) => {
  const inner = <PaymentSettingPageLayout>{page}</PaymentSettingPageLayout>;
  return AccountPageLayout.getLayout(inner);
};

export default PaymentSettingPageLayout;
