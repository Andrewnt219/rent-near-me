import { RouteProps } from '@common-types';
import useTranslation from 'next-translate/useTranslation';
import NextLink from 'next/link';
import { ReactNode } from 'react';
import { useRouteMatch } from 'src/hooks/useRouteMatch';
import tw, { css, styled } from 'twin.macro';

type Props = RouteProps & {
  icon: ReactNode;
  className?: string;
  exact?: boolean;
};
const AppBarMenuItem = ({
  className,
  icon,
  textTranslateKey,
  exact,
  ...linkProps
}: Props) => {
  const isActive = useRouteMatch(linkProps.href.toString(), exact);
  const { t } = useTranslation();

  return (
    <NextLink {...linkProps} passHref>
      <StyledAnchor className={className} isActive={isActive} tw="">
        {icon}
        {t(`common:routes.${textTranslateKey}`)}
      </StyledAnchor>
    </NextLink>
  );
};

const linkActiveStyle = css`
  ${tw`text-primary`}
`;
type StyledAnchorProps = { isActive: boolean };
const StyledAnchor = styled.a<StyledAnchorProps>`
  ${tw`inline-flex flex-col items-center`}
  ${tw`text-sm`}  

  svg {
    ${tw`mb-xs transition-colors`}
    font-size: 2em;

    ${(p) => p.isActive && linkActiveStyle}
  }

  &:hover svg {
    ${linkActiveStyle}
  }
`;

export default AppBarMenuItem;
