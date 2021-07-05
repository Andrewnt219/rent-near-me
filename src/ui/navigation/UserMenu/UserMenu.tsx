import NextLink from 'next/link';
import { useState } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import tw, { styled } from 'twin.macro';

type Props = {
  className?: string;
};
const UserMenu = ({ className }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMenuButtonClick = () => setIsOpen((prev) => !prev);

  return (
    <div
      className={className}
      tw="flex border relative rounded-full pl-md pr-sm py-sm transition-shadow hover:shadow"
    >
      <button
        aria-expanded={isOpen}
        onClick={handleMenuButtonClick}
        tw="inline-flex flex-col justify-center space-y-0.5 h-full"
      >
        <StyledLine />
        <StyledLine />
        <StyledLine />
        <span tw="sr-only">Menu</span>
      </button>

      <FaUserAlt tw="h-7 w-7 p-xs bg-gray rounded-full text-white ml-md" />

      {isOpen && (
        <ul
          aria-label="Menu links"
          tw="absolute top-[125%] right-0 bg-white min-w-[200px] shadow rounded z-40"
        >
          <StyledLinkList aria-label="Your preferences" tw="font-semibold">
            <li>
              <NextLink href="/about" passHref>
                <StyledLink>About</StyledLink>
              </NextLink>
            </li>
            <li>
              <NextLink href="/" passHref>
                <StyledLink>Messages</StyledLink>
              </NextLink>
            </li>
            <li>
              <NextLink href="/" passHref>
                <StyledLink>Messages</StyledLink>
              </NextLink>
            </li>
            <li>
              <NextLink href="/" passHref>
                <StyledLink>Messages</StyledLink>
              </NextLink>
            </li>
          </StyledLinkList>

          <StyledLinkList aria-label="Your properties">
            <li>
              <NextLink href="/" passHref>
                <StyledLink>Messages</StyledLink>
              </NextLink>
            </li>
            <li>
              <NextLink href="/" passHref>
                <StyledLink>Messages</StyledLink>
              </NextLink>
            </li>
            <li>
              <NextLink href="/" passHref>
                <StyledLink>Messages</StyledLink>
              </NextLink>
            </li>
          </StyledLinkList>

          <StyledLinkList aria-label="Other settings">
            <li>
              <NextLink href="/" passHref>
                <StyledLink>Help</StyledLink>
              </NextLink>
            </li>
            <li>
              <NextLink href="/" passHref>
                <StyledLink tw="text-danger font-semibold">Logout</StyledLink>
              </NextLink>
            </li>
          </StyledLinkList>
        </ul>
      )}
    </div>
  );
};

const StyledLine = styled.div`
  ${tw`h-0.5 w-5 bg-dark`}
`;

const StyledLink = styled.a`
  ${tw`px-md py-sm block hover:bg-light`}
`;

const StyledLinkList = styled.ul`
  ${tw`py-sm`}

  :not(:last-of-type) {
    ${tw`border-b `}
  }
`;

export default UserMenu;
