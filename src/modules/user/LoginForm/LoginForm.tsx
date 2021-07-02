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

export default function LoginForm() {
  const { controllers, form, onSubmit, submitError } = useLoginForm();
  const { t } = useTranslation();

  return (
    <div>
      <Form noValidate onSubmit={onSubmit}>
        <TextField
          label={t('common:login.email')}
          type="email"
          id="login-email"
          controller={controllers.email}
        />

        <TextField
          label={t('common:login.password')}
          type="password"
          id="login-password"
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

        <ButtonLg tw="block w-full" disabled={form.formState.isSubmitting}>
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
    </div>
  );
}

const HorizontalLine = styled.hr`
  ${tw`border-gray-300 flex-grow`}
`;
function Or() {
  return (
    <div tw="flex justify-around items-center gap-6 mt-6 mb-4">
      <HorizontalLine />
      <span tw="-mt-1 text-muted text-sm">or</span>
      <HorizontalLine />
    </div>
  );
}

type SignInExternalButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
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
      tw="grid place-items-center w-full py-2.5 border-2 border-gray-400 hover:border-dark rounded-lg"
      style={{ gridTemplateColumns: '3rem auto' }}
    >
      <span>{icon}</span>
      <span tw="font-semibold">{text}</span>
    </button>
  );
}
