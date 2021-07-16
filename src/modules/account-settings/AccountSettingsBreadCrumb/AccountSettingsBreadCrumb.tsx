import { VFC } from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import { useStaticBreadCrumb } from 'src/hooks/useStaticBreadCrumb';
import { accountSettingsRoutes } from '../account-settings-routes';
import AccountSettingsBreadCrumbItem from '../AccountSettingsBreadCrumbItem/AccountSettingsBreadCrumbItem';

type Props = {
  className?: string;
};
const AccountSetingsBreadCrumb: VFC<Props> = ({ className }) => {
  const routes = useStaticBreadCrumb(accountSettingsRoutes);

  return (
    <nav aria-label="breadcrumb" className={className} tw="">
      <ol tw="flex font-semibold">
        {routes.map((route, index) => (
          <li tw="inline-flex items-center" key={index}>
            <AccountSettingsBreadCrumbItem
              isCurrent={index === routes.length - 1}
              route={route}
            />

            {index < routes.length - 1 && (
              <IoIosArrowForward aria-hidden tw="mx-xs" />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default AccountSetingsBreadCrumb;
