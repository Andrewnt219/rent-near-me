import { Icon } from '@iconify/react';
import searchFill from '@iconify/icons-eva/search-fill';
import styled from 'styled-components';
import tw from 'twin.macro';
import { ButtonPrimary } from '@ui/Button/Button';

type Props = {
  className?: string;
};
const SearchBar = ({ className }: Props) => {
  return (
    <StyledWrapper className={className}>
      <StyledInput placeholder="Start your search" />

      <ButtonPrimary
        icon
        size="md"
        tw="absolute top-1/2 right-sm transform -translate-y-1/2"
      >
        <Icon icon={searchFill} />
        <span tw="sr-only">Search</span>
      </ButtonPrimary>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  ${tw`relative`}
`;

const StyledInput = styled.input`
  ${tw`w-full rounded-full h-full border pl-lg pr-xl py-md shadow`}
  ${tw`focus:(ring-2 ring-dark)  placeholder:(text-muted)`}
`;

export default SearchBar;
