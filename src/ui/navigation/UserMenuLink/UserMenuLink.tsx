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
      <StyledLink className={className}>
        {t(`common:routes.${textTranslateKey}`)}
      </StyledLink>
    </NextLink>
  );
};

const StyledLink = styled.a`
  ${tw`px-md py-sm block hover:bg-light`}
`;

export default UserMenuLink;
