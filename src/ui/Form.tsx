import { FormHTMLAttributes } from 'react';
import tw, { css, styled } from 'twin.macro';
import { ButtonLink } from './Button/Button';

type Props = FormHTMLAttributes<HTMLFormElement>;

const Form = ({ children, ...formProps }: Props) => {
  return <form {...formProps}>{children}</form>;
};

/* -------------------------------------------------------------------------- */
/*                                    INPUT                                   */
/* -------------------------------------------------------------------------- */
export const inputCss = css`
  ${tw`border border-bordercolor w-full rounded px-sm pt-lg pb-sm`}
  ${tw`transition-colors`}

  &[aria-invalid='true'] {
    ${tw`border-danger bg-danger`}
  }

  &:hover {
    ${tw`bg-light`}
  }

  &:focus-visible {
    ${tw`ring-2 ring-dark`}
  }
`;

Form.Input = styled.input`
  ${inputCss}
`;

/* -------------------------------------------------------------------------- */
/*                                    LABEL                                   */
/* -------------------------------------------------------------------------- */
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
  ${tw`text-dark`}
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

/* -------------------------------------------------------------------------- */
/*                                   SELECT                                   */
/* -------------------------------------------------------------------------- */
Form.Select = styled.select`
  ${inputCss}
  appearance: none;
`;

Form.ShowPasswordButton = styled(ButtonLink)`
  ${tw`absolute right-md top-1/2 transform -translate-y-1/2`}
  ${tw`underline text-xs`}
`;

/* -------------------------------------------------------------------------- */
/*                                  CHECKBOX                                  */
/* -------------------------------------------------------------------------- */

Form.CheckboxLabel = styled.label`
  ${tw`relative inline-flex items-center gap-md cursor-pointer`}
  user-select: none;
`;

Form.CheckboxTick = styled.span`
  ${tw`grid place-content-center`}
  ${tw`border bg-transparent rounded-md w-7 h-7`}
  ${tw`text-transparent`}  

  label:hover > & {
    ${tw`text-gray`}
  }

  input:checked ~ & {
    ${tw` bg-dark text-white`}
  }

  input:focus-visible ~ & {
    ${tw`ring-2 ring-black`}
  }
`;

/* -------------------------------------------------------------------------- */
/*                                    MISC                                    */
/* -------------------------------------------------------------------------- */
Form.Group = styled.div`
  ${tw`relative mb-md`}
`;

Form.TextWrapper = styled.div`
  ${tw`mt-1 text-xs`}
`;

Form.ErrorMessage = styled.p`
  ${tw`text-danger`}
`;

Form.Description = styled.p`
  ${tw`text-dark`}
`;

export default Form;
