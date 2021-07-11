import tw, { styled } from 'twin.macro';

const Row = styled.div`
  ${tw`flex gap-md`}

  & > * {
    ${tw`flex-1`}
  }
`;

export default Row;
