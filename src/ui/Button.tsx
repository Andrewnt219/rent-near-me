import tw, { css, styled } from 'twin.macro';

export const Button = styled.button`
  ${tw`bg-primary text-white`}
`;

export const ButtonLg = styled(Button)`
  ${tw`px-6 py-2.5 rounded-md`}
  ${tw`font-bold text-lg`}
`;
