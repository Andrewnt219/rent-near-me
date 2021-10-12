import { Translate } from 'next-translate';
import useTranslation from 'next-translate/useTranslation';
import NextLink, { LinkProps } from 'next/link';
import { ComponentProps, useMemo } from 'react';
import { FaInfoCircle, FaLock, FaMoneyBill } from 'react-icons/fa';
import AccountMenuTile from '../AccountMenuTile/AccountMenuTile';

type Props = {
  className?: string;
};
function AccountMenu({ className, ...props }: Props) {
  const { t } = useTranslation();

  const menuItems = useMemo(() => getMenuItems(t), [t]);

  return (
    <ul
      className={className}
      role="menu"
      css={{
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(320px, 100%), 1fr))',
      }}
      tw="gap-md grid"
    >
      {menuItems.map((item, index) => (
        <li key={index} role="none">
          <NextLink {...item.link} passHref>
            <a role="menuitem">
              <AccountMenuTile data={item.data} />
            </a>
          </NextLink>
        </li>
      ))}
    </ul>
  );
}

type MenuItem = {
  data: ComponentProps<typeof AccountMenuTile>['data'];
  link: LinkProps;
};
function getMenuItems(t: Translate): MenuItem[] {
  return [
    {
      link: {
        href: '/account/personal-info',
      },
      data: {
        title: t('account:index.menu-items.personal-info.title'),
        description: t('account:index.menu-items.personal-info.description'),
        icon: <FaInfoCircle tw="text-secondary" />,
      },
    },
    {
      data: {
        title: t('account:index.menu-items.security.title'),
        description: t('account:index.menu-items.security.description'),
        icon: <FaLock tw="text-secondary" />,
      },
      link: {
        href: '/account/security',
      },
    },
    {
      data: {
        title: t('account:index.menu-items.payments.title'),
        description: t('account:index.menu-items.payments.description'),
        icon: <FaMoneyBill tw="text-secondary" />,
      },
      link: {
        href: '/account/payments/payment-methods',
      },
    },
  ];
}

export default AccountMenu;