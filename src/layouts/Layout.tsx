import { HTMLAttributes, PropsWithChildren } from 'react';
import tw, { css, styled, theme } from 'twin.macro';
import { LayoutProvider } from './LayoutModalContext';

type LayoutProps = StyledWrapperProps & HTMLAttributes<HTMLDivElement>;
const Layout = ({
  children,
  size,
  ...htmlAttrs
}: PropsWithChildren<LayoutProps>) => (
  <LayoutProvider>
    <StyledWrapper {...htmlAttrs} size={size}>
      {children}
    </StyledWrapper>
  </LayoutProvider>
);

type Size = 'sm' | 'lg';
const pageSize = (size: Size) => {
  switch (size) {
    case 'lg':
      return css`
        --page-max-width: 110rem;
        --page-px: 1.5rem;
        --app-bar-height: 4.8125rem;

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
        --app-bar-height: 4.8125rem;
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
  ${tw`mx-auto w-full max-w-var-page px-var-page-px`}
`;

export default Layout;
