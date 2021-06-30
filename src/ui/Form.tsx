import { FormHTMLAttributes } from 'react';
import tw, { styled } from 'twin.macro';

type Props = FormHTMLAttributes<HTMLFormElement>;

const Form = ({ children, ...formProps }: Props) => {
  return <form {...formProps}>{children}</form>;
};

Form.Group = styled.div``;
Form.TextField = styled.input``;
Form.Label = styled.label`
  ${Form.Group} & {
    ${tw`text-red-500`}
  }
`;
Form.ErrorMessage = styled.p``;

export default Form;
