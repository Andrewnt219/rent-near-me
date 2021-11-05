import { InputHTMLAttributes, ReactNode, useState, VFC, useMemo } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useController } from 'react-hook-form';
import Form from './Form';

type PasswordFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  name: string;
  label: ReactNode;
  inputDescription?: ReactNode;
};

const PasswordField: VFC<PasswordFieldProps> = ({
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

  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword((show) => !show);

  const errMsgId = useMemo(() => `error-${id}`, [id]);
  const descId = useMemo(() => `description-${id}`, [id]);

  return (
    <Form.Group>
      <div tw="relative">
        <Form.Input
          id={id}
          aria-describedby={`description-${id}`}
          aria-invalid={fieldState.invalid}
          tw="!pr-14"
          type={showPassword ? 'text' : 'password'}
          {...inputProps}
          {...field}
          value={value.toString()}
          placeholder=" "
        />

        <Form.Label htmlFor={id}>{label}</Form.Label>

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
