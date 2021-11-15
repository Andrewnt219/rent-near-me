import { NextLayout } from '@/next';
import AccountPageHeader from '@modules/account/components/AccountPageHeader/AccountPageHeader';
import NextLink from 'next/link';
import { PropsWithChildren, ReactNode } from 'react';
import AccountPageLayout from '../AccountPageLayout/AccountPageLayout';
type Props = {
  className?: string;
};
const PaymentSettingPageLayout: NextLayout<PropsWithChildren<Props>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div className={className} tw="">
      <AccountPageHeader title="Payments & payouts" />

      <NextLink href="/account/payments/payment-methods">
        <a>Payments</a>
      </NextLink>

      <NextLink href="/account/payments/payout-methods">
        <a>Payouts</a>
      </NextLink>

      <NextLink href="/account/payments/tax-info">
        <a>Taxes</a>
      </NextLink>

      {children}
    </div>
  );
};

PaymentSettingPageLayout.getLayout = (page: ReactNode) => {
  const inner = <PaymentSettingPageLayout>{page}</PaymentSettingPageLayout>;
  return AccountPageLayout.getLayout(inner);
};

export default PaymentSettingPageLayout;
