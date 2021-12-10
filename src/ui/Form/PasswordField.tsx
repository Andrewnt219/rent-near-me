import { InputHTMLAttributes, ReactNode, useState, VFC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useController } from 'react-hook-form';
import Form from './Form';
import { useId } from '@radix-ui/react-id';

type PasswordFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: ReactNode;
  inputDescription?: ReactNode;
};

const PasswordField: VFC<PasswordFieldProps> = ({
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

  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword((show) => !show);

  const passwordFieldId = useId(id);
  const errMsgId = `passwordField-error-${passwordFieldId}`;
  const descId = `passwordField-description-${passwordFieldId}`;

  return (
    <Form.Group>
      <div tw="relative">
        <Form.Input
          id={passwordFieldId}
          aria-describedby={`${errMsgId} ${descId}`}
          aria-invalid={fieldState.invalid}
          tw="!pr-14"
          type={showPassword ? 'text' : 'password'}
          {...inputProps}
          {...field}
          value={value.toString()}
          placeholder=" "
        />

        <Form.Label htmlFor={passwordFieldId}>{label}</Form.Label>

        <Form.ShowPasswordButton type="button" onClick={toggleShowPassword}>
          {showPassword
            ? t('common:fields.password.hide')
            : t('common:fields.password.show')}
        </Form.ShowPasswordButton>
      </div>

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

export default PasswordField;
