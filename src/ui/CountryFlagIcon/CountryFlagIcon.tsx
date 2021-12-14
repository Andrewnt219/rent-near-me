import { VFC } from 'react';
import Image, { ImageProps } from 'next/image';
import { Country } from '@utils/locale-utils';

type CountryFlagIconProps = Omit<ImageProps, 'src'> & {
  country: Country | undefined;
};

const CountryFlagIcon: VFC<CountryFlagIconProps> = ({ country, ...props }) =>
  country ? (
    <Image alt={country} {...props} src={`/images/flags/${country}.png`} />
  ) : null;

export default CountryFlagIcon;
