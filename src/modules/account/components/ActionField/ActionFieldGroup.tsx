import tw, { styled } from 'twin.macro';

const ActionFieldGroup = styled.div`
  ${tw`divide-y`}

  & > * {
    ${tw`py-lg`}

    &:first-child {
      ${tw`pt-0`}
    }
  }
`;

export default ActionFieldGroup;
