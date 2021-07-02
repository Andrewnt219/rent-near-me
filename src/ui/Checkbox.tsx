import { InputHTMLAttributes, ReactNode } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';
import Form from './Form';

type Props<FormValues> = InputHTMLAttributes<HTMLInputElement> & {
  label: ReactNode;
  inputDescription?: ReactNode;
  children?: never;
  controller: UseControllerProps<FormValues>;
};

export default function Checkbox<FormValues>({
  label,
  inputDescription,
  controller,
  ...inputProps
}: Props<FormValues>) {
  const { field, fieldState } = useController(controller);
  return (
    <Form.Group>
      <Form.CheckboxGroup>
        <input
          type="checkbox"
          tw="hidden"
          aria-hidden
          aria-invalid={fieldState.invalid}
          aria-checked={field.value === true}
          {...inputProps}
          onChange={field.onChange}
          onBlur={field.onBlur}
          name={field.name}
        />
        <Form.Checkbox>
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
        <span>{label}</span>
      </Form.CheckboxGroup>

      <Form.TextWrapper>
        <Form.ErrorMessage>{fieldState.error?.message}</Form.ErrorMessage>
        <Form.Description>{inputDescription}</Form.Description>
      </Form.TextWrapper>
    </Form.Group>
  );
}
