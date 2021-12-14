import { VFC } from 'react';
import Image, { ImageProps } from 'next/image';
import { Country } from '@utils/locale-utils';
import UsFlag from './flags/us.svg';
import ViFlag from './flags/vi.svg';

type CountryFlagIconProps = Omit<ImageProps, 'src'> & {
  /**
   * The ISO 639-1 country code of the flag
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
 * * Key is the ISO 639-1 country code
 * * Value can be a StaticImport or a path to the flag icon
 */
const FLAGS_BY_COUNTRY_CODE = {
  us: UsFlag,
  vi: ViFlag,
};

export default CountryFlagIcon;
