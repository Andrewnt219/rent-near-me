import { CustomNextPage } from '@/next';
import PaymentSettingPageLayout from '@modules/account/layouts/PaymentSettingPageLayout/PaymentSettingPageLayout';
import Text from '@ui/Text/Text';

type Props = {
  className?: string;
};
const TaxInfoPage: CustomNextPage<Props> = ({ className }: Props) => {
  return (
    <div className={className} tw="">
      <Text component="h2" variant="h3">
        Taxes
      </Text>
    </div>
  );
};

TaxInfoPage.getLayout = PaymentSettingPageLayout.getLayout;

export default TaxInfoPage;
