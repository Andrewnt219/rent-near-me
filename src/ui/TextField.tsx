import { InputHTMLAttributes, ReactNode } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';
import Form from './Form';

type Props<FormValues> = InputHTMLAttributes<HTMLInputElement> & {
  label: ReactNode;
  inputDescription?: ReactNode;
  children?: never;
  id: string;
  controller: UseControllerProps<FormValues>;
};

function TextField<FormValues>(props: Props<FormValues>) {
  const { label, inputDescription, controller, ...inputProps } = props;
  const { field, fieldState } = useController(controller);

  return (
    <Form.Group>
      <Form.Input
        aria-invalid={fieldState.invalid}
        {...inputProps}
        onChange={field.onChange}
        onBlur={field.onBlur}
        name={field.name}
        placeholder=" "
      />

      <Form.Label htmlFor={inputProps.id}>{label}</Form.Label>

      <Form.TextWrapper>
        <Form.ErrorMessage>{fieldState.error?.message}</Form.ErrorMessage>
        <Form.Description>{inputDescription}</Form.Description>
      </Form.TextWrapper>
    </Form.Group>
  );
}

export default TextField;
