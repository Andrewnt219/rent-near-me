import { forwardRef, RefAttributes } from 'react';
import UsFlag from '@iconify/icons-emojione/flag-for-united-states';
import VnFlag from '@iconify/icons-emojione/flag-for-vietnam';
import { Icon, IconifyIcon, IconProps } from '@iconify/react';

type CountryFlagIconProps = Omit<IconProps, 'icon'> & {
  /**
   * The ISO-3166 country code of the flag
   */
  country: string | undefined;
};

/**
 * A component that displays the flag of the country specified by the `country` prop
 */
const CountryFlagIcon = forwardRef<
  RefAttributes<SVGSVGElement>,
  CountryFlagIconProps
>(({ country, ...props }, ref) =>
  country ? (
    <Icon {...props} ref={ref} icon={FLAGS_BY_COUNTRY_CODE[country] ?? ''} />
  ) : null
);

/**
 * Key-value pairs of countries supported by this component
 * * Key is the ISO-3166 country code
 * * Value can be a StaticImport or a path to the flag icon
 */
const FLAGS_BY_COUNTRY_CODE: Record<string, IconifyIcon | string> = {
  us: UsFlag,
  vn: VnFlag,
};

export default CountryFlagIcon;
