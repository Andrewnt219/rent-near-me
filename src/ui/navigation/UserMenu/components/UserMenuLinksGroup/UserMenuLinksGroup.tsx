import { RouteProps } from '@common-types';
import { Children, PropsWithChildren } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import UserMenuLink from '../UserMenuLink/UserMenuLink';

type Props = {
  className?: string;
  routes: RouteProps[];
  label: string;
};
function UserMenuLinksGroup({
  className,
  label,
  routes,
  children,
}: PropsWithChildren<Props>) {
  return (
    <StyledList role="menu" aria-label={label} className={className}>
      {routes.map((routeProps, index) => (
        <li key={index} role="none">
          <UserMenuLink {...routeProps} />
        </li>
      ))}

      {Children.map(children, (child) => (
        <li role="none">{child}</li>
      ))}
    </StyledList>
  );
}

const StyledList = styled.ul`
  ${tw`py-sm`}

  :not(:last-of-type) {
    ${tw`border-b `}
  }
`;

export default UserMenuLinksGroup;
