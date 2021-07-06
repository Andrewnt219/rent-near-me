import { RouteProps } from '@common-types';
import NextLink from 'next/link';
import tw, { styled } from 'twin.macro';

type Props = RouteProps & {
  className?: string;
};
const UserMenuLink = ({ className, text, exact, ...routeProps }: Props) => {
  return (
    <NextLink {...routeProps} passHref>
      <StyledLink className={className}>{text}</StyledLink>
    </NextLink>
  );
};

const StyledLink = styled.a`
  ${tw`px-md py-sm block hover:bg-light`}
`;

export default UserMenuLink;
