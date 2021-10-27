import { SelectHTMLAttributes, ReactNode } from 'react';
import {
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';
import { GoChevronDown } from 'react-icons/go';
import Form from './Form';

type Props<FormValues extends FieldValues> =
  SelectHTMLAttributes<HTMLSelectElement> & {
    label: ReactNode;
    inputDescription?: ReactNode;
    id: string;
    controller: UseControllerProps<FormValues>;
  };

function Select<FormValues extends FieldValues>(props: Props<FormValues>) {
  const { label, inputDescription, controller, ...selectProps } = props;
  const {
    field: { value, ...field },
    fieldState,
  } = useController(controller);

  return (
    <Form.Group>
      <Form.Select
        aria-invalid={fieldState.invalid}
        {...selectProps}
        {...field}
        value={value.toString()}
        data-selected={value.toString() !== ''}
      >
        {props.children}
      </Form.Select>

      <Form.Label htmlFor={selectProps.id}>{label}</Form.Label>
      <GoChevronDown tw="absolute top-lg right-md" />

      <Form.TextWrapper>
        {fieldState.invalid && (
          <Form.ErrorMessage>{fieldState.error?.message}</Form.ErrorMessage>
        )}
        {!fieldState.invalid && (
          <Form.Description>{inputDescription}</Form.Description>
        )}
      </Form.TextWrapper>
    </Form.Group>
  );
}

export default Select;