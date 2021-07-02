import NextLink, { LinkProps } from 'next/link';
import { PropsWithChildren, ReactNode } from 'react';
import { useRouteMatch } from 'src/hooks/useRouteMatch';
import tw, { css, styled } from 'twin.macro';

type Props = PropsWithChildren<LinkProps> & {
  icon: ReactNode;
  text: ReactNode;
  children?: never;
  className?: string;
  exact?: boolean;
};
const AppBarMenuItem = ({
  className,
  icon,
  text,
  exact,
  ...linkProps
}: Props) => {
  const isActive = useRouteMatch(linkProps.href.toString(), exact);

  return (
    <NextLink {...linkProps} passHref>
      <StyledAnchor className={className} isActive={isActive} tw="">
        {icon}
        {text}
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
  ${tw`text-xs`}  

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
