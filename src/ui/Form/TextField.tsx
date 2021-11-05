import { InputHTMLAttributes, ReactNode, VFC, useMemo } from 'react';
import { useController } from 'react-hook-form';
import Form from './Form';

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  name: string;
  label: ReactNode;
  inputDescription?: ReactNode;
};

const TextField: VFC<TextFieldProps> = ({
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
      <Form.Input
        id={id}
        aria-describedby={`${errMsgId} ${descId}`}
        aria-invalid={fieldState.invalid}
        {...inputProps}
        {...field}
        value={value.toString()}
        placeholder=" "
      />

      <Form.Label htmlFor={id}>{label}</Form.Label>

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

export default TextField;
