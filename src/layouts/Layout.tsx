import { HTMLAttributes, PropsWithChildren } from 'react';
import tw, { css, styled, theme } from 'twin.macro';

type Props = StyledWrapperProps & HTMLAttributes<HTMLDivElement>;
const Layout = ({ children, size, ...htmlAttrs }: PropsWithChildren<Props>) => (
  <StyledWrapper {...htmlAttrs} size={size}>
    {children}
  </StyledWrapper>
);

type Size = 'sm' | 'lg';
const pageSize = (size: Size) => {
  switch (size) {
    case 'lg':
      return css`
        --page-max-width: 110rem;
        --page-px: 1.5rem;

        @media screen and (min-width: ${theme('screens.md')}) {
          --page-px: 2.5rem;
        }

        @media screen and (min-width: ${theme('screens.lg')}) {
          --page-px: 5rem;
        }
      `;

    case 'sm':
      return css`
        --page-max-width: 100%;
        --page-px: 1.5rem;
      `;

    default:
      throw new Error('Invalid size');
  }
};

type StyledWrapperProps = {
  size: Size;
};
const StyledWrapper = styled.div<StyledWrapperProps>`
  ${(p) => pageSize(p.size)}
`;

Layout.Container = styled.div`
  max-width: var(--page-max-width, 90rem);
  padding-left: var(--page-px, 1.5rem);
  padding-right: var(--page-px, 1.5rem);

  ${tw`mx-auto w-full`}
`;

export default Layout;
