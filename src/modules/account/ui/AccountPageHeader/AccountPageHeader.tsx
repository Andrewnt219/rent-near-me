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
      <h1 tw="text-h2 mt-sm font-semibold">{title}</h1>
    </header>
  );
};

export default AccountPageHeader;
