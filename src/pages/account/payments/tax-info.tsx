import { CustomNextPage } from '@/next';
import PaymentSettingPageLayout from '@modules/account/layouts/PaymentSettingPageLayout/PaymentSettingPageLayout';
import Text from '@ui/Text/Text';

const TaxInfoPage: CustomNextPage = () => {
  return (
    <div tw="">
      <Text component="h2" variant="h3">
        Taxes
      </Text>
    </div>
  );
};

TaxInfoPage.getLayout = PaymentSettingPageLayout.getLayout;

export default TaxInfoPage;
