import AuthService from '@services/AuthService';
import { ButtonLink, ButtonOutline, ButtonPrimary } from '@ui/Button/Button';
import Checkbox from '@ui/Form/Checkbox';
import Form from '@ui/Form/Form';
import HrText from '@ui/HrText/HrText';
import PasswordField from '@ui/Form/PasswordField';
import TextField from '@ui/Form/TextField';
import useTranslation from 'next-translate/useTranslation';
import { MouseEventHandler, ButtonHTMLAttributes, ReactNode } from 'react';
import { FaFacebook, FaKey } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { RiErrorWarningFill } from 'react-icons/ri';
import tw from 'twin.macro';
import { useLoginForm } from './useLoginForm';

const signInExternalIconStyle = tw`w-6 h-6`;

type LoginFormProps = {
  onCreateNewAccountClick?: MouseEventHandler<HTMLButtonElement>;
};

const LoginForm = ({
  onCreateNewAccountClick = () => undefined,
}: LoginFormProps) => {
  const { controllers, form, onSubmit, submitError } = useLoginForm();
  const { t } = useTranslation();

  return (
    <Form noValidate onSubmit={onSubmit}>
      <h4 tw="text-xl mb-md font-semibold">Welcome back to RentNearMe!</h4>

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
        inputDescription={
          <ButtonLink type="button">Forget password?</ButtonLink>
        }
      />

      <Checkbox
        id="login-keepLogIn"
        controller={controllers.keepLogIn}
        label={t('common:login.keepSignedIn')}
      />

      {submitError && (
        <Form.ErrorMessage
          role="alert"
          aria-relevant="text"
          tw="flex items-center gap-sm mb-sm"
        >
          <RiErrorWarningFill tw="w-5 h-5 fill-current" />
          {submitError}
        </Form.ErrorMessage>
      )}

      <ButtonPrimary
        size="md"
        type="submit"
        tw="block w-full"
        disabled={form.formState.isSubmitting}
      >
        {form.formState.isSubmitting
          ? t('common:login.loading')
          : t('common:login.login')}
      </ButtonPrimary>

      <HrText tw="my-lg">or</HrText>

      <ul aria-label="Sign-in options" tw="space-y-sm">
        <SignInExternalButton
          type="button"
          icon={<FcGoogle css={signInExternalIconStyle} />}
          text={t('common:login.google')}
          onClick={AuthService.signInWithGoogle}
        />

        <SignInExternalButton
          type="button"
          icon={
            <FaFacebook css={signInExternalIconStyle} tw="text-[#1877f2]" />
          }
          text={t('common:login.facebook')}
          onClick={AuthService.signInWithFacebook}
        />

        <SignInExternalButton
          type="button"
          icon={<FaKey css={signInExternalIconStyle} />}
          text={t('common:login.new-account')}
          onClick={onCreateNewAccountClick}
        />
      </ul>
    </Form>
  );
};

export default LoginForm;

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
    <ButtonOutline
      tw="w-full grid grid-cols-[3rem auto] place-items-center"
      size="md"
      {...buttonProps}
    >
      <span aria-hidden>{icon}</span>
      <span>{text}</span>
    </ButtonOutline>
  );
}
