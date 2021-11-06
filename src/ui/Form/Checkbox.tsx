import { InputHTMLAttributes, ReactNode, useMemo, VFC } from 'react';
import { useController } from 'react-hook-form';
import Form from './Form';
import { Icon } from '@iconify/react';
import checkmarkCircle2Fill from '@iconify/icons-eva/checkmark-circle-2-fill';

type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  name: string;
  label: ReactNode;
  inputDescription?: ReactNode;
};

const Checkbox: VFC<CheckboxProps> = ({
  id,
  name,
  label,
  inputDescription,
  ...inputProps
}) => {
  const {
    field: { value, ...field },
    fieldState,
  } = useController({ name });

  const errMsgId = useMemo(() => `error-${id}`, [id]);
  const descId = useMemo(() => `description-${id}`, [id]);

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
          aria-describedby={`${errMsgId} ${descId}`}
          aria-checked={value === true}
          aria-invalid={fieldState.invalid}
        >
          <Icon icon={checkmarkCircle2Fill} />
        </Form.CheckboxTick>

        {label}
      </Form.CheckboxLabel>

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

export default Checkbox;
