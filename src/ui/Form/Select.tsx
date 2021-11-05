import { SelectHTMLAttributes, ReactNode, FC, useMemo } from 'react';
import { useController } from 'react-hook-form';
import { GoChevronDown } from 'react-icons/go';
import Form from './Form';

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  id: string;
  name: string;
  label: ReactNode;
  inputDescription?: ReactNode;
};

const Select: FC<SelectProps> = ({
  id,
  name,
  label,
  inputDescription,
  children,
  ...selectProps
}) => {
  const {
    field: { value, ...field },
    fieldState,
  } = useController({ name });

  const errMsgId = useMemo(() => `error-${id}`, [id]);
  const descId = useMemo(() => `description-${id}`, [id]);

  return (
    <Form.Group>
      <Form.Select
        id={id}
        aria-invalid={fieldState.invalid}
        aria-describedby={fieldState.invalid ? errMsgId : descId}
        {...selectProps}
        {...field}
        value={value.toString()}
        data-selected={value.toString() !== ''}
      >
        {children}
      </Form.Select>

      <Form.Label htmlFor={id}>{label}</Form.Label>
      <GoChevronDown tw="absolute top-lg right-md" />

      <Form.TextWrapper>
        {fieldState.invalid ? (
          <Form.ErrorMessage id={errMsgId}>
            {fieldState.error?.message}
          </Form.ErrorMessage>
        ) : (
          <Form.Description id={descId}>{inputDescription}</Form.Description>
        )}
      </Form.TextWrapper>
    </Form.Group>
  );
};

export default Select;
