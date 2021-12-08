import { ComponentProps, forwardRef, VFC } from 'react';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import { Icon } from '@iconify/react';
import personFill from '@iconify/icons-eva/person-fill';
import menuFill from '@iconify/icons-eva/menu-fill';
import { ButtonGhost } from '@ui/Button/Button';
import { useModals } from '@ui/Modal/ModalContext';
import { Menu, MenuItem, MenuItemGroup, MenuLink } from '@ui/Menu';
import { useAuth } from '@modules/user-auth/contexts/AuthContext';
import AuthApi from '@services/AuthApi';

const UserMenu: VFC = () => {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();
  const { registerModal, loginModal } = useModals();
  const router = useRouter();

  return (
    <Menu button={<UserMenuButton />}>
      {isAuthenticated ? (
        <MenuItemGroup>
          <MenuLink href="/account">
            {t('common:routes.account.index')}
          </MenuLink>
        </MenuItemGroup>
      ) : (
        <MenuItemGroup tw="font-semibold">
          <MenuItem onSelect={registerModal?.show}>
            {t('common:userMenu.register')}
          </MenuItem>
          <MenuItem onSelect={loginModal?.show}>
            {t('common:userMenu.login')}
          </MenuItem>
        </MenuItemGroup>
      )}
      <MenuItemGroup>
        <MenuLink href="/">{t('common:routes.home')}</MenuLink>
        <MenuLink href="/account/security">
          {t('common:routes.account.security')}
        </MenuLink>
        <MenuLink href="/wishlist">{t('common:routes.wishlist')}</MenuLink>
      </MenuItemGroup>
      {isAuthenticated && (
        <MenuItemGroup>
          <MenuItem
            tw="text-danger"
            onSelect={async () => {
              await router.push('/');
              await AuthApi.signOut();
            }}
          >
            {t('common:userMenu.logout')}
          </MenuItem>
        </MenuItemGroup>
      )}
    </Menu>
  );
};

const UserMenuButton = forwardRef<HTMLButtonElement, ComponentProps<'button'>>(
  (props, ref) => {
    return (
      <ButtonGhost
        {...props}
        rounded
        tw="flex items-center border pl-md pr-sm py-sm transition-shadow hover:shadow"
        ref={ref}
      >
        <Icon icon={menuFill} height={24} />
        <Icon icon={personFill} height={32} width={32} tw="p-xs ml-xs" />
        <span tw="sr-only">Menu</span>
      </ButtonGhost>
    );
  }
);

export default UserMenu;
