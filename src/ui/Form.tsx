import { FormHTMLAttributes } from 'react';
import tw, { css, styled } from 'twin.macro';

type Props = FormHTMLAttributes<HTMLFormElement>;

const Form = ({ children, ...formProps }: Props) => {
  return <form {...formProps}>{children}</form>;
};

Form.Group = styled.div`
  ${tw`relative mb-md`}
`;

Form.Row = styled.div`
  ${tw`flex gap-md`}

  & > * {
    ${tw`flex-1`}
  }
`;

export const inputCss = css`
  ${tw`border focus-within:(border-2 border-black) border-dark`}
  ${tw`w-full rounded px-sm pt-lg pb-sm`}
  ${tw`focus:outline-none hover:bg-light`}
  ${tw`transition-colors`}

  &[aria-invalid='true'] {
    ${tw`border-danger bg-red-light`}
  }
`;
Form.Input = styled.input`
  ${inputCss}
`;

export const labelActiveCss = css`
  ${tw`translate-y-1 text-xs`}
`;
export const labelInvalidCss = css`
  ${tw`text-danger`}
`;
Form.Label = styled.label`
  /* Translate y equals to input pt */
  /* left equals to input pl */
  ${tw`absolute top-0 left-sm transform translate-y-md`}
  ${tw`text-gray-dark`}
  ${tw`transition-all`} 

  input:focus ~ &, input:not(:placeholder-shown) ~ & {
    ${labelActiveCss}
  }

  select[data-selected='true'] ~ & {
    ${labelActiveCss}
  }

  input[aria-invalid='true'] ~ &,
  select[aria-invalid='true'] ~ & {
    ${labelInvalidCss}
  }
`;

Form.Select = styled.select`
  ${inputCss}
  appearance: none;
`;

Form.ShowPasswordButton = styled.button`
  top: 1.15rem;
  ${tw`absolute right-md`}
  ${tw`font-semibold underline text-xs`}
  ${tw`rounded-sm`}

  &:focus {
    ${tw`outline-none`}
    ${tw`ring-2 ring-black ring-offset-2`}
  }

  &:focus:not(:focus-visible) {
    ${tw`ring-0 ring-offset-0`}
  }
`;

Form.CheckboxGroup = styled.label`
  ${tw`relative inline-flex items-center gap-md cursor-pointer`}
  user-select: none;
`;

Form.Checkbox = styled.span`
  ${tw`grid place-content-center`}
  ${tw`w-7 h-7`}
  ${tw`border border-gray bg-transparent`}

  border-radius: 5px;

  label:hover > & {
    ${tw`border-dark`}
  }

  input:checked ~ & {
    ${tw`border-dark bg-dark`}
  }

  input:focus ~ & {
    ${tw`ring-2 ring-black ring-offset-2`}
  }

  input:focus:not(:focus-visible) ~ & {
    ${tw`ring-0 ring-offset-0`}
  }
`;

Form.CheckboxTick = styled.svg`
  ${tw`w-5 h-5 invisible pointer-events-none`}
  stroke: white;
  stroke-width: 4;

  input:checked ~ span > & {
    ${tw`visible`}
  }
`;

Form.TextWrapper = styled.div`
  ${tw`mt-1 text-xs`}
`;

Form.ErrorMessage = styled.p`
  ${tw`text-danger`}
`;

Form.Description = styled.p`
  ${tw`text-gray-dark`}
`;

export default Form;
