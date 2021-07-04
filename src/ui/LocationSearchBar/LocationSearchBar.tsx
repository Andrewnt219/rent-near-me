import Button from '@ui/Button/Button';
import { FaSearch } from 'react-icons/fa';

type Props = {
  className?: string;
};
const SearchBar = ({ className }: Props) => {
  return (
    <div className={className} tw="">
      <input />

      <Button>
        <FaSearch />
        <span tw="sr-only">Search</span>
      </Button>
    </div>
  );
};

export default SearchBar;
