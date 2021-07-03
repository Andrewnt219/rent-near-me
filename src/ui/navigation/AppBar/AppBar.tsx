import { FaHeart, FaSearch, FaUserAlt } from 'react-icons/fa';
import tw, { styled } from 'twin.macro';
import AppBarMenuItem from '../AppBarMenuItem/AppBarMenuItem';
type Props = {
  className?: string;
};
const AppBar = ({ className }: Props) => {
  return (
    <StyledHeader className={className}>
      <nav>
        <StyledMenuList>
          <li>
            <AppBarMenuItem href="/" icon={<FaSearch />} text="Explore" />
          </li>
          <li>
            <AppBarMenuItem
              href="/wishlist"
              icon={<FaHeart />}
              text="Wishlist"
            />
          </li>
          <li>
            <AppBarMenuItem href="/login" icon={<FaUserAlt />} text="Login" />
          </li>
        </StyledMenuList>
      </nav>
    </StyledHeader>
  );
};

const StyledHeader = styled.nav`
  ${tw`w-full absolute bottom-0 left-0 py-md border-gray-light border-t`}
`;

const StyledMenuList = styled.ul`
  ${tw`flex space-x-xl justify-center w-full`}
`;

export default AppBar;
