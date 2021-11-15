import PaymentSettingPageLayout, {
  getPaymentSettingPageLayout,
} from '@modules/account/layouts/PaymentSettingPageLayout/PaymentSettingPageLayout';
import Text from '@ui/Text/Text';
import { ReactNode } from 'react';

type Props = {
  className?: string;
};
export default function PayoutMethodsPage({ className }: Props) {
  return (
    <div className={className} tw="">
      <Text component="h2" variant="h3">
        Payout
      </Text>
    </div>
  );
}

PayoutMethodsPage.getLayout = getPaymentSettingPageLayout;
