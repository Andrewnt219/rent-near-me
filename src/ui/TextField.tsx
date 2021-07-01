import { InputHTMLAttributes, ReactNode } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';
import Form from './Form';

type Props<FormValues extends Record<string, string>> =
  InputHTMLAttributes<HTMLInputElement> & {
    label: ReactNode;
    inputDescription?: ReactNode;
    children?: never;
    id: string;
    controller: UseControllerProps<FormValues>;
  };

function TextField<FormValues extends Record<string, string>>(
  props: Props<FormValues>
) {
  const { label, inputDescription, controller, ...inputProps } = props;
  const { field, fieldState } = useController(controller);
  const { value } = field;

  return (
    <Form.Group>
      <Form.Input
        aria-invalid={!!fieldState.error?.message}
        {...inputProps}
        {...field}
        value={value}
        placeholder=" "
      />

      <Form.Label htmlFor={inputProps.id}>{label}</Form.Label>

      <div tw="mt-1 text-sm">
        <Form.ErrorMessage>{fieldState.error?.message}</Form.ErrorMessage>

        <Form.Description>{inputDescription}</Form.Description>
      </div>
    </Form.Group>
  );
}

TextField.displayName = 'TextField';

export default TextField;
