import { ButtonPrimary } from '@ui/Button/Button';
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

      <StyledButton circle>
        <FaSearch />
        <span tw="sr-only">Search</span>
      </StyledButton>
    </StyledWrapper>
  );
};

const StyledButton = styled(ButtonPrimary)`
  ${tw`w-10 h-10 inline-flex items-center justify-center absolute top-1/2 right-sm transform -translate-y-1/2`}
`;

const StyledWrapper = styled.div`
  ${tw`relative`}
`;

const StyledInput = styled.input`
  ${tw`w-full rounded-full h-full border pl-lg pr-3xl py-md`}
  ${tw`focus:(ring-2 ring-dark)  placeholder:( text-gray)`}

  box-shadow: 0px 1px 2px rgb(0 0 0 / 8%), 0px 4px 12px rgb(0 0 0 / 5%);
`;

export default SearchBar;
