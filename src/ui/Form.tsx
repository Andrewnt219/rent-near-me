import { FormHTMLAttributes } from 'react';
import tw, { css, styled } from 'twin.macro';

type Props = FormHTMLAttributes<HTMLFormElement>;

const Form = ({ children, ...formProps }: Props) => {
  return <form {...formProps}>{children}</form>;
};

Form.Group = styled.div`
  ${tw`relative mb-md`}
`;

export const inputCss = css`
  ${tw`w-full border rounded px-sm pt-lg pb-sm`}
  ${tw`focus:outline-none hover:bg-light`}
  ${tw`transition-colors`}

  &[aria-invalid='true'] {
    ${tw`border-danger`}
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
  ${tw`text-muted`}
  ${tw`transition-all`} 

  input:focus ~ &, input:not(:placeholder-shown) ~ & {
    ${labelActiveCss}
  }

  input[aria-invalid='true'] ~ & {
    ${labelInvalidCss}
  }
`;

Form.CheckboxGroup = styled.label`
  ${tw`relative inline-flex items-center gap-md cursor-pointer`}
  user-select: none;
`;

Form.Checkbox = styled.span`
  ${tw`grid place-content-center`}
  ${tw`w-7 h-7`}
  ${tw`border border-gray-400 bg-transparent`}

  border-radius: 5px;

  label:hover > & {
    ${tw`border-dark`}
  }

  input:checked ~ & {
    ${tw`border-dark bg-dark`}
  }
`;

Form.CheckboxTick = styled.svg`
  ${tw`w-5 h-5 invisible`}
  stroke: white;
  stroke-width: 4;

  input:checked ~ span > & {
    ${tw`visible`}
  }
`;

Form.TextWrapper = styled.div`
  ${tw`mt-1 text-sm`}
`;

Form.ErrorMessage = styled.p`
  ${tw`text-danger`}
`;

Form.Description = styled.p`
  ${tw`text-muted`}
`;

export default Form;
