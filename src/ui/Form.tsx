import { FormHTMLAttributes } from 'react';
import tw, { styled } from 'twin.macro';

type Props = FormHTMLAttributes<HTMLFormElement>;

const Form = ({ children, ...formProps }: Props) => {
  return <form {...formProps}>{children}</form>;
};

Form.Group = styled.div`
  ${tw`relative mb-md`}
`;
Form.Input = styled.input`
  ${tw`w-full border rounded px-sm py-md`}
  ${tw`focus:outline-none hover:bg-light`}

  &[aria-invalid='true'] {
    ${tw`border-danger`}
  }
`;
Form.Label = styled.label`
  /* Translate y equals to input pt */
  ${tw`!mt-0 absolute top-0 left-sm transform translate-y-md`}
  ${tw`text-muted`}
  ${tw`transition-all`} 

  ${Form.Input}:focus ~ &, ${Form.Input}:not(:placeholder-shown) ~ & {
    ${tw`translate-y-1 text-xs`}
  }

  ${Form.Input}[aria-invalid='true'] ~ & {
    ${tw`text-danger`}
  }
`;
Form.ErrorMessage = styled.p`
  ${tw`text-danger`}
`;
Form.Description = styled.p`
  ${tw`text-muted`}
`;

export default Form;
