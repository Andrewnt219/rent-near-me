import { RouteProps } from '@common-types';
import useTranslation from 'next-translate/useTranslation';
import NextLink from 'next/link';
import { VFC } from 'react';
import tw, { css, styled } from 'twin.macro';

type Props = {
  className?: string;
  route: RouteProps;
  isCurrent: boolean;
};
const BreadCrumbItem: VFC<Props> = ({ className, ...props }) => {
  const { exact, textTranslateKey, ...routeProps } = props.route;
  const { t } = useTranslation();

  return (
    <NextLink {...routeProps} passHref>
      <StyledLink
        aria-current={props.isCurrent ? 'step' : undefined}
        isActive={props.isCurrent}
        className={className}
        tw=""
      >
        {t(`common:routes.${textTranslateKey}`)}
      </StyledLink>
    </NextLink>
  );
};
/* -------------------------------------------------------------------------- */
const activeStyle = css`
  ${tw`text-secondary `};
`;
type StyledLinkProps = {
  isActive: boolean;
};
const StyledLink = styled.a<StyledLinkProps>`
  ${tw`hover:underline`}

  &:focus-visible {
    ${tw`ring-2 ring-dark`}
  }

  ${(p) => p.isActive && activeStyle}
`;

export default BreadCrumbItem;
