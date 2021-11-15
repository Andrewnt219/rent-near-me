import { CustomNextPage } from '@/next';
import PaymentSettingPageLayout from '@modules/account/layouts/PaymentSettingPageLayout/PaymentSettingPageLayout';
import Text from '@ui/Text/Text';

type Props = {
  className?: string;
};
const PaymentMethodsPage: CustomNextPage<Props> = ({ className }) => {
  return (
    <div className={className} tw="">
      <Text component="h2" variant="h3">
        Payments
      </Text>
    </div>
  );
};

PaymentMethodsPage.getLayout = PaymentSettingPageLayout.getLayout;

export default PaymentMethodsPage;
