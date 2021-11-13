import { Icon } from '@iconify/react';
import facebookIcon from '@iconify/icons-logos/facebook';
import googleIcon from '@iconify/icons-logos/google-icon';
import alertTriangleFill from '@iconify/icons-eva/alert-triangle-fill';
import { useLayoutModal } from '@modules/layouts/contexts/LayoutModalContext';
import { ButtonLink, ButtonOutline, ButtonPrimary } from '@ui/Button/Button';
import Checkbox from '@ui/Form/Checkbox';
import Form from '@ui/Form/Form';
import PasswordField from '@ui/Form/PasswordField';
import TextField from '@ui/Form/TextField';
import HrText from '@ui/HrText/HrText';
import Text from '@ui/Text/Text';
import useTranslation from 'next-translate/useTranslation';
import { ButtonHTMLAttributes, ReactNode } from 'react';
import tw from 'twin.macro';
import useLoginForm from './useLoginForm';
import Logo from '@ui/Logo/Logo';

const LoginForm = () => {
  const {
    form,
    onSubmit,
    submitError,
    onLoginWithGoogle,
    onLoginWithFacebook,
  } = useLoginForm();
  const { t } = useTranslation();
  const { registerModal } = useLayoutModal();

  return (
    <Form form={form} noValidate onSubmit={onSubmit}>
      <Text tw="mb-md" component="h4" variant="h4">
        {t('common:login.welcome')}
      </Text>

      <TextField
        label={t('common:login.email')}
        type="email"
        id="login-email"
        name="email"
        autoComplete="username"
      />

      <PasswordField
        label={t('common:login.password')}
        id="login-password"
        name="password"
        autoComplete="current-password"
        inputDescription={
          <ButtonLink type="button">
            {t('common:login.forgetPassword')}
          </ButtonLink>
        }
      />

      <Checkbox
        id="login-keepLogIn"
        name="keepLogIn"
        label={t('common:login.keepSignedIn')}
      />

      {submitError && (
        <Form.ErrorMessage
          role="alert"
          aria-relevant="text"
          tw="flex items-center gap-sm mb-sm"
        >
          <Icon icon={alertTriangleFill} tw="w-5 h-5 fill-current" />
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
          icon={
            <StyledIconWrapper>
              <Logo />
            </StyledIconWrapper>
          }
          text={t('common:login.newAccount')}
          onClick={registerModal.show}
        />
        <SignInExternalButton
          type="button"
          icon={
            <StyledIconWrapper>
              <Icon icon={googleIcon} tw="text-muted" />
            </StyledIconWrapper>
          }
          text={t('common:login.google')}
          onClick={onLoginWithGoogle}
        />
        <SignInExternalButton
          type="button"
          icon={
            <StyledIconWrapper>
              <Icon icon={facebookIcon} tw="text-muted" />
            </StyledIconWrapper>
          }
          text={t('common:login.facebook')}
          onClick={onLoginWithFacebook}
        />
      </ul>
    </Form>
  );
};

const StyledIconWrapper = tw.span`svg:(w-6 h-6)`;

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
      <span tw="text-left">{text}</span>
    </ButtonOutline>
  );
}
