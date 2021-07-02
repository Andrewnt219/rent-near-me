import { InputHTMLAttributes, ReactNode } from 'react';
import {
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';
import Form from './Form';

type Props<FormValues extends FieldValues> =
  InputHTMLAttributes<HTMLInputElement> & {
    label: ReactNode;
    inputDescription?: ReactNode;
    children?: never;
    controller: UseControllerProps<FormValues>;
    id: string;
  };

export default function Checkbox<FormValues extends FieldValues>({
  id,
  label,
  inputDescription,
  controller,
  ...inputProps
}: Props<FormValues>) {
  const {
    field: { value, ...field },
    fieldState,
  } = useController(controller);

  return (
    <Form.Group>
      <Form.CheckboxGroup>
        <input
          id={id}
          type="checkbox"
          tw="hidden"
          aria-hidden
          checked={value === true}
          {...inputProps}
          {...field}
        />
        <Form.Checkbox
          role="checkbox"
          aria-describedby={id + 'error'}
          aria-checked={value === true}
          aria-invalid={fieldState.invalid}
        >
          <Form.CheckboxTick
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="presentation"
            focusable="false"
          >
            <path fill="none" d="m4 16.5 8 8 16-16"></path>
          </Form.CheckboxTick>
        </Form.Checkbox>

        <label htmlFor={id}>{label}</label>
      </Form.CheckboxGroup>

      <Form.TextWrapper>
        <Form.ErrorMessage id={id + 'error'}>
          {fieldState.error?.message}
        </Form.ErrorMessage>
        <Form.Description>{inputDescription}</Form.Description>
      </Form.TextWrapper>
    </Form.Group>
  );
}
