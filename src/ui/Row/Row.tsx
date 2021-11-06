import tw, { styled } from 'twin.macro';

const Row = styled.div`
  ${tw`flex gap-md flex-wrap`}

  & > * {
    ${tw`flex-1`}
  }
`;

export const InputRow = tw(Row)`mb-md all-child:(min-w-[200px] mb-0)`;

export default Row;
