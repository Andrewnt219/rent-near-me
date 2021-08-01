import { VFC } from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import { useStaticBreadCrumb } from 'src/hooks/useStaticBreadCrumb';
import { accountRoutes } from '../../account-routes';
import AccountBreadCrumbItem from '../AccountBreadCrumbItem/AccountBreadCrumbItem';

type Props = {
  className?: string;
};
const AccountBreadCrumb: VFC<Props> = ({ className }) => {
  const routes = useStaticBreadCrumb(accountRoutes);

  return (
    <nav aria-label="breadcrumb" className={className} tw="">
      <ol tw="flex font-semibold">
        {routes.map((route, index) => (
          <li tw="inline-flex items-center" key={index}>
            <AccountBreadCrumbItem
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

export default AccountBreadCrumb;
