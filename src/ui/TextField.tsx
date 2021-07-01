import { isNullOrUndefined } from '@utils/validate-utils';
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

  const errorMessage = fieldState.error?.message;

  return (
    <Form.Group>
      <Form.Input
        aria-invalid={!isNullOrUndefined(errorMessage)}
        {...inputProps}
        {...field}
        placeholder=" "
      />

      <Form.Label htmlFor={inputProps.id}>{label}</Form.Label>

      <Form.TextWrapper>
        <Form.ErrorMessage>{errorMessage}</Form.ErrorMessage>

        <Form.Description>{inputDescription}</Form.Description>
      </Form.TextWrapper>
    </Form.Group>
  );
}

export default TextField;
