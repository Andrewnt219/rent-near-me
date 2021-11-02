import { VFC } from 'react';
import { MdChevronRight } from 'react-icons/md';
import { useStaticBreadCrumb } from 'src/hooks/useStaticBreadCrumb';
import { accountRoutes } from '../../routes';
import BreadCrumbItem from './BreadCrumbItem';

type Props = {
  className?: string;
};
const BreadCrumb: VFC<Props> = ({ className }) => {
  const routes = useStaticBreadCrumb(accountRoutes);

  return (
    <nav aria-label="breadcrumb" className={className} tw="">
      <ol tw="flex">
        {routes.map((route, index) => (
          <li tw="inline-flex items-center" key={index}>
            <BreadCrumbItem
              isCurrent={index === routes.length - 1}
              route={route}
            />

            {index < routes.length - 1 && (
              <MdChevronRight aria-hidden tw="mx-xs" />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default BreadCrumb;
