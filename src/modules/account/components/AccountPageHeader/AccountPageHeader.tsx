import { FC, ReactNode } from 'react';
import BreadCrumb from '../BreadCrumb/BreadCrumb';
type Props = {
  className?: string;
  title: ReactNode;
};
const AccountPageHeader: FC<Props> = ({ className, title }) => {
  return (
    <div className={className} tw="">
      <BreadCrumb />
      <h1 tw="text-h2 mt-sm font-bold">{title}</h1>
    </div>
  );
};

export default AccountPageHeader;
