import { VFC } from 'react';
import Image, { ImageProps } from 'next/image';
import { Country } from '@utils/locale-utils';
import UsFlag from './flags/us.svg';
import ViFlag from './flags/vi.svg';

type CountryFlagIconProps = Omit<ImageProps, 'src'> & {
  country: Country | undefined;
};

const CountryFlagIcon: VFC<CountryFlagIconProps> = ({ country, ...props }) =>
  country ? (
    <Image alt={country} {...props} src={FLAGS_BY_COUNTRY_CODE[country]} />
  ) : null;

const FLAGS_BY_COUNTRY_CODE = {
  us: UsFlag,
  vi: ViFlag,
};

export default CountryFlagIcon;
