import { ringStyle } from '@styles/globals-styles';
import { ButtonSimple } from '@ui/Button/Button';
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

      <StyledButton>
        <FaSearch />
        <span tw="sr-only">Search</span>
      </StyledButton>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  ${tw`border rounded-full flex justify-between items-center pl-lg pr-xs py-sm shadow-sm`}

  box-shadow: 0px 1px 2px rgb(0 0 0 / 8%), 0px 4px 12px rgb(0 0 0 / 5%);

  &:focus-within {
    ${ringStyle}
  }
`;

const StyledButton = styled(ButtonSimple)`
  ${tw`rounded-full`}
`;

export default SearchBar;
