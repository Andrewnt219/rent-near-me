import { CustomNextPage } from '@/next';
import PaymentSettingPageLayout from '@modules/account/layouts/PaymentSettingPageLayout/PaymentSettingPageLayout';
import Text from '@ui/Text/Text';
import { GetStaticProps, InferGetStaticPropsType } from 'next';

const PaymentMethodsPage: CustomNextPage = () => {
  return (
    <div tw="">
      <Text component="h2" variant="h3">
        Payments
      </Text>
    </div>
  );
};

PaymentMethodsPage.getLayout = PaymentSettingPageLayout.getLayout;

export default PaymentMethodsPage;
