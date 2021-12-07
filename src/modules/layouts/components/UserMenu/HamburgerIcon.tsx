import { VFC } from 'react';
import tw, { styled } from 'twin.macro';

const HamburgerIcon: VFC = () => (
  <StyledHamburgerContainer>
    <StyledHamburgerLine />
    <StyledHamburgerLine />
    <StyledHamburgerLine />
  </StyledHamburgerContainer>
);

export default HamburgerIcon;

const StyledHamburgerContainer = styled.div`
  ${tw`inline-flex flex-col justify-center space-y-0.5 h-full`}
`;

const StyledHamburgerLine = styled.div`
  ${tw`h-0.5 w-5 bg-dark`}
`;
