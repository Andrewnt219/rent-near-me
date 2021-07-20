import { FC, ReactNode } from 'react';
import AccountBreadCrumb from '../AccountBreadCrumb/AccountBreadCrumb';
type Props = {
  className?: string;
  title: ReactNode;
};
const AccountPageHeader: FC<Props> = ({ className, title }) => {
  return (
    <header className={className} tw="">
      <AccountBreadCrumb />
      <h1 tw="text-h2 mt-sm font-bold">{title}</h1>
    </header>
  );
};

export default AccountPageHeader;
