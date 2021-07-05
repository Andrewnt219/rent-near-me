import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';
import tw, { css, styled } from 'twin.macro';
import useTranslation from 'next-translate/useTranslation';
import Form from '@ui/Form';
import TextField from '@ui/TextField';
import Checkbox from '@ui/Checkbox';
import { ButtonLg } from '@ui/Button';
import GoogleIcon from '@assets/ic-google.svg';
import FacebookIcon from '@assets/ic-facebook.svg';
import ErrorIcon from '@assets/ic-error.svg';
import { useLoginForm } from './useLoginForm';
import AuthService from '@services/AuthService';
import PasswordField from '@ui/PasswordField';

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
        <Form.ErrorMessage tw="text-base flex items-center gap-2 mb-2">
          <ErrorIcon tw="w-5 h-5 fill-current" />
          {submitError}
        </Form.ErrorMessage>
      )}

      <ButtonLg
        type="submit"
        tw="block w-full"
        disabled={form.formState.isSubmitting}
      >
        {form.formState.isSubmitting
          ? t('common:login.loading')
          : t('common:login.login')}
      </ButtonLg>

      <Or />

      <SignInExternalButton
        tw="mb-4"
        icon={<GoogleIcon tw="w-6 h-6" />}
        text={t('common:login.google')}
        onClick={async () => await AuthService.signInWithGoogle()}
      />

      <SignInExternalButton
        icon={<FacebookIcon tw="w-6 h-6" />}
        text={t('common:login.facebook')}
        onClick={async () => await AuthService.signInWithFacebook()}
      />
    </Form>
  );
}

const HorizontalLine = styled.hr`
  ${tw`border-gray-light flex-grow`}
`;
function Or() {
  return (
    <div tw="flex justify-around items-center gap-6 my-6">
      <HorizontalLine />
      <span tw="-mt-1 text-gray-dark text-sm">or</span>
      <HorizontalLine />
    </div>
  );
}

type SignInExternalButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: ReactNode;
  text: ReactNode;
};
function SignInExternalButton({
  text,
  icon,
  ...buttonProps
}: SignInExternalButtonProps) {
  return (
    <button
      {...buttonProps}
      tw="grid grid-cols-[3rem auto] place-items-center w-full py-2.5 border-2 border-gray-light hover:border-dark rounded-lg"
    >
      <span>{icon}</span>
      <span tw="font-semibold">{text}</span>
    </button>
  );
}
