import { Icon } from '@iconify/react';
import personFill from '@iconify/icons-eva/person-fill';
import { useModals } from '@ui/Modal/ModalContext';
import { useAuth } from '@modules/user-auth/contexts/AuthContext';
import AuthApi from '@services/AuthApi';
import { ButtonGhost } from '@ui/Button/Button';
import React, { VFC } from 'react';
import { useRouter } from 'next/router';
import Menu from '@ui/Menu/Menu';
import { MenuItem, MenuItemGroup, MenuLink } from '@ui/Menu';
import useTranslation from 'next-translate/useTranslation';
import HamburgerIcon from './HamburgerIcon';

const UserMenu: VFC = () => {
  return (
    <Menu
      button={
        <ButtonGhost
          rounded
          tw="flex items-center border pl-md pr-sm py-sm transition-shadow hover:shadow"
        >
          <HamburgerIcon />
          <Icon icon={personFill} tw="w-8 h-8 p-xs rounded-full ml-sm" />
          <span tw="sr-only">Menu</span>
        </ButtonGhost>
      }
    >
      <UserMenuContent />
    </Menu>
  );
};

const UserMenuContent = () => {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();
  const { registerModal, loginModal } = useModals();
  const router = useRouter();

  return (
    <>
      {isAuthenticated ? (
        <MenuItemGroup>
          <MenuLink href="/account">
            {t('common:routes.account.index')}
          </MenuLink>
        </MenuItemGroup>
      ) : (
        <MenuItemGroup tw="font-semibold">
          <MenuItem onSelect={registerModal?.show}>Register</MenuItem>
          <MenuItem onSelect={loginModal?.show}>Login</MenuItem>
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
            Logout
          </MenuItem>
        </MenuItemGroup>
      )}
    </>
  );
};

export default UserMenu;
