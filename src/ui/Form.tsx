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
  ${tw`w-full border rounded px-sm py-md`}
  ${tw`focus:outline-none hover:bg-light`}

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
