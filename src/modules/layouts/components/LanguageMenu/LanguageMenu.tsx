import { ComponentProps, forwardRef, VFC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import setLanguage from 'next-translate/setLanguage';
import { Icon } from '@iconify/react';
import globeFill from '@iconify/icons-eva/globe-fill';
import { ButtonOutline } from '@ui/Button';
import { Menu, MenuItem, MenuItemGroup } from '@ui/Menu';
import Text from '@ui/Text/Text';
import i18nConfig from 'i18n.json';
import CountryFlagIcon from '@ui/CountryFlagIcon';
import { getCountryCodeByLocale, Locale } from '@utils/locale-utils';

const LanguageMenu: VFC = () => {
  const { t, lang } = useTranslation();

  return (
    <Menu trigger={<LanguageMenuButton />}>
      <MenuItemGroup label={t('common:languageMenu.message')}>
        {i18nConfig.locales.map((locale) => (
          <MenuItem
            key={locale}
            onSelect={() => setLanguage(locale)}
            disabled={locale === lang}
          >
            <div tw="flex items-center gap-md">
              <CountryFlagIcon
                width={32}
                height={32}
                country={getCountryCodeByLocale(locale as Locale)}
              />
              <Text>{t(`common:locale.${locale}`)}</Text>
            </div>
          </MenuItem>
        ))}
      </MenuItemGroup>
    </Menu>
  );
};

export default LanguageMenu;

const LanguageMenuButton = forwardRef<
  HTMLButtonElement,
  ComponentProps<'button'>
>((props, ref) => {
  const { lang } = useTranslation();
  return (
    <ButtonOutline
      {...props}
      icon
      size="lg"
      tw="relative border p-xs transition-shadow hover:shadow"
      ref={ref}
    >
      <CountryFlagIcon
        width={128}
        height={128}
        country={getCountryCodeByLocale(lang as Locale)}
      />
      <span tw="sr-only">Change site&apos; language</span>
      <span
        aria-hidden
        tw="p-px bg-white rounded-full absolute -bottom-0.5 -right-1 shadow"
      >
        <Icon icon={globeFill} height={20} width={20} />
      </span>
    </ButtonOutline>
  );
});
