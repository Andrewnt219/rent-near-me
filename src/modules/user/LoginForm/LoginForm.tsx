import AuthService from '@services/AuthService';
import { ButtonPrimary, ButtonSimple } from '@ui/Button/Button';
import Checkbox from '@ui/Checkbox';
import Form from '@ui/Form';
import HrText from '@ui/HrText/HrText';
import PasswordField from '@ui/PasswordField';
import TextField from '@ui/TextField';
import useTranslation from 'next-translate/useTranslation';
import { ButtonHTMLAttributes, ReactNode } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { RiErrorWarningFill, RiFacebookCircleFill } from 'react-icons/ri';
import tw, { styled } from 'twin.macro';
import { useLoginForm } from './useLoginForm';

const signInExternalIconStyle = tw`w-6 h-6`;

export default function LoginForm() {
  const { controllers, form, onSubmit, submitError } = useLoginForm();
  const { t } = useTranslation();

  return (
    <Form noValidate onSubmit={onSubmit}>
      <TextField
        label={t('common:login.email')}
        type="email"
        id="login-email"
        autoComplete="username"
        controller={controllers.email}
      />

      <PasswordField
        label={t('common:login.password')}
        id="login-password"
        autoComplete="current-password"
        controller={controllers.password}
      />

      <Checkbox
        id="login-keepLogIn"
        controller={controllers.keepLogIn}
        label={t('common:login.keepSignedIn')}
      />

      {submitError && (
        <Form.ErrorMessage tw="text-body flex items-center gap-2 mb-2">
          <RiErrorWarningFill tw="w-5 h-5 fill-current" />
          {submitError}
        </Form.ErrorMessage>
      )}

      <ButtonPrimary
        size="xl"
        type="submit"
        tw="block w-full"
        disabled={form.formState.isSubmitting}
      >
        {form.formState.isSubmitting
          ? t('common:login.loading')
          : t('common:login.login')}
      </ButtonPrimary>

      <HrText>or</HrText>

      <SignInExternalButton
        tw="mb-4"
        icon={<FcGoogle css={signInExternalIconStyle} />}
        text={t('common:login.google')}
        onClick={async () => await AuthService.signInWithGoogle()}
      />

      <SignInExternalButton
        icon={
          <RiFacebookCircleFill
            css={signInExternalIconStyle}
            tw="text-facebook"
          />
        }
        text={t('common:login.facebook')}
        onClick={async () => await AuthService.signInWithFacebook()}
      />
    </Form>
  );
}

const ExternalAuthButton = styled(ButtonSimple)`
  ${tw`grid grid-cols-[3rem auto] place-items-center`}
  ${tw`border-2 rounded-lg`}
  ${tw`w-full`}
`;
type ExternalAuthButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: ReactNode;
  text: ReactNode;
};
function SignInExternalButton({
  text,
  icon,
  ...buttonProps
}: ExternalAuthButtonProps) {
  return (
    <ExternalAuthButton outline {...buttonProps}>
      <span>{icon}</span>
      <span tw="font-semibold">{text}</span>
    </ExternalAuthButton>
  );
}
