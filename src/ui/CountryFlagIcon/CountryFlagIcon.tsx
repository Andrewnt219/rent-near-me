import { VFC } from 'react';
import Image, { ImageProps } from 'next/image';
import { Country } from '@utils/locale-utils';
import UsFlag from './flags/us.svg';
import VnFlag from './flags/vn.svg';

type CountryFlagIconProps = Omit<ImageProps, 'src'> & {
  /**
   * The ISO-3166 country code of the flag
   */
  country: Country | undefined;
};

/**
 * A component that displays the flag of the country specified by the `country` prop
 */
const CountryFlagIcon: VFC<CountryFlagIconProps> = ({ country, ...props }) =>
  country ? (
    <Image alt={country} {...props} src={FLAGS_BY_COUNTRY_CODE[country]} />
  ) : null;

/**
 * Key-value pairs of countries supported by this component
 * * Key is the ISO-3166 country code
 * * Value can be a StaticImport or a path to the flag icon
 */
const FLAGS_BY_COUNTRY_CODE = {
  us: UsFlag,
  vn: VnFlag,
};

export default CountryFlagIcon;
