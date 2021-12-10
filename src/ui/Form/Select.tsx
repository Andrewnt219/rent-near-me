import { SelectHTMLAttributes, ReactNode, FC } from 'react';
import { useController } from 'react-hook-form';
import Form from './Form';
import { Icon } from '@iconify/react';
import arrowDownFill from '@iconify/icons-eva/arrow-down-fill';
import { useId } from '@react-aria/utils';

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  name: string;
  label: ReactNode;
  inputDescription?: ReactNode;
};

const Select: FC<SelectProps> = ({
  name,
  label,
  inputDescription,
  children,
  id,
  ...selectProps
}) => {
  const {
    field: { value, ...field },
    fieldState,
  } = useController({ name });

  const selectId = useId(id);
  const errMsgId = `select-error-${selectId}`;
  const descId = `select-description-${selectId}`;

  return (
    <Form.Group>
      <Form.Select
        id={selectId}
        aria-invalid={fieldState.invalid}
        aria-describedby={`${errMsgId} ${descId}`}
        {...selectProps}
        {...field}
        value={value.toString()}
        data-selected={value.toString() !== ''}
      >
        {children}
      </Form.Select>

      <Form.Label htmlFor={selectId}>{label}</Form.Label>
      <Icon icon={arrowDownFill} tw="absolute h-6 w-4 top-md right-md" />

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
