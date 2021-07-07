import { FaHeart, FaSearch, FaUserAlt } from 'react-icons/fa';
import AppBarMenuItem from '../AppBarMenuItem/AppBarMenuItem';
type Props = {
  className?: string;
};
const AppBar = ({ className }: Props) => {
  return (
    <header
      className={className}
      tw="h-var-app-bar fixed bottom-0 left-0 right-0 py-md border-gray-light border-t bg-white"
    >
      <nav>
        <ul tw="flex space-x-xl justify-center w-full">
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
        </ul>
      </nav>
    </header>
  );
};

export default AppBar;
