import Text from '@ui/Text/Text';
import { CustomNextPage } from '@/next';
import PaymentSettingPageLayout from '@modules/account/layouts/PaymentSettingPageLayout/PaymentSettingPageLayout';

type Props = {
  className?: string;
};
const PayoutMethodsPage: CustomNextPage<Props> = ({ className }) => {
  return (
    <div className={className} tw="">
      <Text component="h2" variant="h3">
        Payout
      </Text>
    </div>
  );
};

PayoutMethodsPage.getLayout = PaymentSettingPageLayout.getLayout;

export default PayoutMethodsPage;
