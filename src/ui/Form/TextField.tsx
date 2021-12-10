import { useId } from '@radix-ui/react-id';
import { InputHTMLAttributes, ReactNode, VFC } from 'react';
import { useController } from 'react-hook-form';
import Form from './Form';

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: ReactNode;
  inputDescription?: ReactNode;
};

const TextField: VFC<TextFieldProps> = ({
  name,
  label,
  inputDescription,
  id,
  ...inputProps
}) => {
  const {
    field: { value, ...field },
    fieldState,
  } = useController({ name });

  const textFieldId = useId(id);
  const errMsgId = `textField-error-${textFieldId}`;
  const descId = `textField-description-${textFieldId}`;

  return (
    <Form.Group>
      <Form.Input
        id={textFieldId}
        aria-describedby={`${errMsgId} ${descId}`}
        aria-invalid={fieldState.invalid}
        {...inputProps}
        {...field}
        value={value.toString()}
        placeholder=" "
      />

      <Form.Label htmlFor={textFieldId}>{label}</Form.Label>

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
