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
      <StyledInput placeholder="Start your search" />

      <StyledButton>
        <FaSearch />
        <span tw="sr-only">Search</span>
      </StyledButton>
    </StyledWrapper>
  );
};

const StyledButton = styled(ButtonSimple)`
  ${tw`rounded-full absolute top-1/2 right-0 transform -translate-y-1/2`}
`;

const StyledWrapper = styled.div`
  ${tw`relative`}
`;

const StyledInput = styled.input`
  ${tw`w-full rounded-full h-full border pl-lg pr-3xl py-sm`}
  ${tw`focus:(ring-2 ring-dark)  placeholder:( font-semibold text-dark)`}

  box-shadow: 0px 1px 2px rgb(0 0 0 / 8%), 0px 4px 12px rgb(0 0 0 / 5%);
`;

export default SearchBar;
