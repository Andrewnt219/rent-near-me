import AccountPageHeader from '@modules/account/components/AccountPageHeader/AccountPageHeader';
import NextLink from 'next/link';
import { PropsWithChildren } from 'react';
import SettingsPageLayout from '../SettingsPageLayout/SettingsPageLayout';
type Props = {
  className?: string;
};
function PaymentSettingPageLayout({
  className,
  children,
  ...props
}: PropsWithChildren<Props>) {
  return (
    <SettingsPageLayout>
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
    </SettingsPageLayout>
  );
}

export default PaymentSettingPageLayout;
