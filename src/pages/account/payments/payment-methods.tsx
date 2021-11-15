import PaymentSettingPageLayout, {
  getPaymentSettingPageLayout,
} from '@modules/account/layouts/PaymentSettingPageLayout/PaymentSettingPageLayout';
import Text from '@ui/Text/Text';
import { ReactNode } from 'react';

type Props = {
  className?: string;
};
export default function PaymentMethodsPage({ className }: Props) {
  return (
    <div className={className} tw="">
      <Text component="h2" variant="h3">
        Payments
      </Text>
    </div>
  );
}

PaymentMethodsPage.getLayout = getPaymentSettingPageLayout;
