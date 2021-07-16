import { FC, ReactNode } from 'react';
import AccountSettingsBreadCrumb from '../AccountSettingsBreadCrumb/AccountSettingsBreadCrumb';
type Props = {
  className?: string;
  title: ReactNode;
};
const AccountSettingsHeader: FC<Props> = ({ className, title }) => {
  return (
    <header className={className} tw="">
      <AccountSettingsBreadCrumb />
      <h1 tw="text-h2 mt-sm font-bold">{title}</h1>
    </header>
  );
};

export default AccountSettingsHeader;
