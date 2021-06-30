import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';
import Form from './Form';

type Ref = HTMLInputElement;
type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: ReactNode;
  errorMessage?: ReactNode;
  inputDescription?: ReactNode;
  children?: never;
  id: string;
};

const TextField = forwardRef<Ref, Props>((props, ref) => {
  const { label, inputDescription, errorMessage, ...inputProps } = props;

  return (
    <Form.Group>
      <Form.Input
        aria-invalid={!!errorMessage}
        {...inputProps}
        ref={ref}
        placeholder=" "
      />

      <Form.Label htmlFor={inputProps.id}>{label}</Form.Label>

      <div tw="mt-1 text-sm">
        <Form.ErrorMessage>{errorMessage}</Form.ErrorMessage>

        <Form.Description>{inputDescription}</Form.Description>
      </div>
    </Form.Group>
  );
});

TextField.displayName = 'TextField';

export default TextField;
