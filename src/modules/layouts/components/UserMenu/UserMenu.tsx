import { ComponentProps, forwardRef, VFC } from 'react';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import { Icon } from '@iconify/react';
import personFill from '@iconify/icons-eva/person-fill';
import menuFill from '@iconify/icons-eva/menu-fill';
import { Button } from '@ui/Button';
import { useModals } from '@ui/Modal/ModalContext';
import { Menu, MenuItem, MenuItemGroup, MenuLink } from '@ui/Menu';
import { useAuth } from '@modules/user-auth/contexts/AuthContext';
import AuthApi from '@services/AuthApi';

const UserMenu: VFC = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { registerModal, loginModal } = useModals();

  return (
    <div>
      {/* The `div` is to avoid layout shift when the menu is toggled
          `portalled: false` to easily place the menu behind the Modal's overlay */}
      <Menu trigger={<UserMenuButton />} menuPopupProps={{ portalled: false }}>
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
        <MenuItemGroup label={t('common:userMenu.quickLinks')}>
          <MenuLink href="/">{t('common:routes.home')}</MenuLink>
          {isAuthenticated && (
            <>
              <MenuLink href="/account/security">
                {t('common:routes.account.security')}
              </MenuLink>
              <MenuLink href="/wishlist">
                {t('common:routes.wishlist')}
              </MenuLink>
            </>
          )}
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
    </div>
  );
};

const UserMenuButton = forwardRef<HTMLButtonElement, ComponentProps<'button'>>(
  (props, ref) => {
    return (
      <Button
        {...props}
        rounded
        size="md"
        variant="ghost"
        tw="flex items-center border pr-sm transition-shadow hover:shadow"
        ref={ref}
      >
        <Icon icon={menuFill} height={24} />
        <Icon icon={personFill} height={32} width={32} tw="p-xs ml-xs" />
        <span tw="sr-only">User menu</span>
      </Button>
    );
  }
);

export default UserMenu;
