import { Icon } from '@iconify/react';
import atFill from '@iconify/icons-eva/at-fill';
import alertTriangleFill from '@iconify/icons-eva/alert-triangle-fill';
import facebookFill from '@iconify/icons-eva/facebook-fill';
import googleFill from '@iconify/icons-eva/google-fill';
import { useLayoutModal } from '@modules/layouts/contexts/LayoutModalContext';
import AuthService from '@services/AuthService';
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
import { useLoginForm } from './useLoginForm';

const LoginForm = () => {
  const { controllers, form, onSubmit, submitError } = useLoginForm();
  const { t } = useTranslation();
  const { registerModal } = useLayoutModal();

  return (
    <Form noValidate onSubmit={onSubmit}>
      <Text tw="mb-md" component="h4" variant="h4">
        Welcome back to RentNearMe!
      </Text>

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
              <Icon icon={googleFill} tw="text-muted" />
            </StyledIconWrapper>
          }
          text={t('common:login.google')}
          onClick={AuthService.signInWithGoogle}
        />
        <SignInExternalButton
          type="button"
          icon={
            <StyledIconWrapper>
              <Icon icon={facebookFill} tw="text-muted" />
            </StyledIconWrapper>
          }
          text={t('common:login.facebook')}
          onClick={AuthService.signInWithFacebook}
        />

        <SignInExternalButton
          type="button"
          icon={
            <StyledIconWrapper>
              <Icon icon={atFill} tw="text-muted" />
            </StyledIconWrapper>
          }
          text={t('common:login.new-account')}
          onClick={registerModal.show}
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
