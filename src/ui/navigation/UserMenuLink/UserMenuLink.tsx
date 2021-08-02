import { RouteProps } from '@common-types';
import useTranslation from 'next-translate/useTranslation';
import NextLink from 'next/link';
import tw, { styled } from 'twin.macro';

type Props = RouteProps & {
  className?: string;
};
const UserMenuLink = ({
  className,
  textTranslateKey,
  exact,
  ...routeProps
}: Props) => {
  const { t } = useTranslation();

  return (
    <NextLink {...routeProps} passHref>
      <StyledUserMenuLink className={className}>
        {t(`common:routes.${textTranslateKey}`)}
      </StyledUserMenuLink>
    </NextLink>
  );
};

export const StyledUserMenuLink = styled.a`
  /* Force inherit font on buttons */
  ${tw`font-inherit w-full text-left px-md py-sm block hover:bg-light`}

  &:focus-visible {
    ${tw`ring-2 ring-dark`}
  }
`;

export default UserMenuLink;
