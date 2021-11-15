import AccountPageHeader from '@modules/account/components/AccountPageHeader/AccountPageHeader';
import DefaultLayout from '@modules/layouts/DefaultLayout';
import NextLink from 'next/link';
import { PropsWithChildren, ReactNode } from 'react';
import AccountPageLayout, {
  getAccountPageLayout,
} from '../AccountPageLayout/AccountPageLayout';
type Props = {
  className?: string;
};
export default function PaymentSettingPageLayout({
  className,
  children,
  ...props
}: PropsWithChildren<Props>) {
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
}

export const getPaymentSettingPageLayout = (page: ReactNode) => {
  const inner = <PaymentSettingPageLayout>{page}</PaymentSettingPageLayout>;
  return getAccountPageLayout(inner);
};
