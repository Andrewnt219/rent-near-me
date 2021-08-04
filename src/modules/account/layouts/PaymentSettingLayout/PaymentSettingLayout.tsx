import AccountPageHeader from '@modules/account/components/AccountPageHeader/AccountPageHeader';
import NextLink from 'next/link';
import { PropsWithChildren } from 'react';
type Props = {
  className?: string;
};
function PaymentSettingLayout({
  className,
  children,
  ...props
}: PropsWithChildren<Props>) {
  return (
    <section className={className} tw="">
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
    </section>
  );
}

export default PaymentSettingLayout;
