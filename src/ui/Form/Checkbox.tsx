import { InputHTMLAttributes, ReactNode } from 'react';
import {
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';
import { Icon } from '@iconify/react';
import Form from './Form';
import checkmarkCircle2Fill from '@iconify/icons-eva/checkmark-circle-2-fill';

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
      <Form.CheckboxLabel>
        <input
          id={id}
          type="checkbox"
          tw="sr-only"
          aria-hidden
          checked={value === true}
          {...inputProps}
          {...field}
        />
        <Form.CheckboxTick
          role="checkbox"
          aria-describedby={id + 'error'}
          aria-checked={value === true}
          aria-invalid={fieldState.invalid}
        >
          <Icon icon={checkmarkCircle2Fill} />
        </Form.CheckboxTick>

        {label}
      </Form.CheckboxLabel>

      <Form.TextWrapper>
        <Form.ErrorMessage id={id + 'error'}>
          {fieldState.error?.message}
        </Form.ErrorMessage>
        <Form.Description>{inputDescription}</Form.Description>
      </Form.TextWrapper>
    </Form.Group>
  );
}
