import Text from '@ui/Text/Text';
import { FC, ReactNode } from 'react';
import BreadCrumb from '../BreadCrumb/BreadCrumb';
type Props = {
  className?: string;
  title: ReactNode;
};
const AccountPageHeader: FC<Props> = ({ className, title }) => {
  return (
    <header className={className} tw="">
      <BreadCrumb />
      <Text component="h1" variant="h2">
        {title}
      </Text>
    </header>
  );
};

export default AccountPageHeader;
