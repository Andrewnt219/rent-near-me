import { FaSearch } from 'react-icons/fa';
import styled from 'styled-components';
import tw from 'twin.macro';

type Props = {
  className?: string;
};
const SearchBar = ({ className }: Props) => {
  return (
    <StyledWrapper className={className}>
      <input
        placeholder="Start your search"
        tw="placeholder:( font-semibold text-dark)"
      />

      <button>
        <FaSearch />
        <span tw="sr-only">Search</span>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  ${tw`border rounded-full flex justify-between items-center pl-lg pr-md py-sm shadow-sm`}
  box-shadow: 0px 1px 2px rgb(0 0 0 / 8%), 0px 4px 12px rgb(0 0 0 / 5%);
`;

export default SearchBar;
