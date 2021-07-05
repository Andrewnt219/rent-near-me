import useTranslation from 'next-translate/useTranslation';
import { InputHTMLAttributes, ReactNode, useState } from 'react';
import {
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';
import Form from './Form';

type Props<FormValues extends FieldValues> =
  InputHTMLAttributes<HTMLInputElement> & {
    label: ReactNode;
    inputDescription?: ReactNode;
    children?: never;
    id: string;
    autoComplete: string;
    controller: UseControllerProps<FormValues>;
  };

function PasswordField<FormValues extends FieldValues>(
  props: Props<FormValues>
) {
  const { label, inputDescription, controller, ...inputProps } = props;
  const {
    field: { value, ...field },
    fieldState,
  } = useController(controller);

  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword((show) => !show);

  const { t } = useTranslation();

  return (
    <Form.Group>
      <Form.Input
        aria-invalid={fieldState.invalid}
        tw="!pr-14"
        type={showPassword ? 'text' : 'password'}
        {...inputProps}
        {...field}
        value={value.toString()}
        placeholder=" "
      />

      <Form.Label htmlFor={inputProps.id}>{label}</Form.Label>
      <Form.ShowPasswordButton type="button" onClick={toggleShowPassword}>
        {showPassword
          ? t('common:fields.password.hide')
          : t('common:fields.password.show')}
      </Form.ShowPasswordButton>

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

export default PasswordField;
