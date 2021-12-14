import { forwardRef } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { ButtonProps, ButtonLink } from '@ui/Button';
import { useModals } from '@ui/Modal/ModalContext';

type ForgetPasswordButtonProps = ButtonProps;

const ForgetPasswordButton = forwardRef<
  HTMLButtonElement,
  ForgetPasswordButtonProps
>((props, ref) => {
  const { t } = useTranslation();
  const { forgetPasswordModal } = useModals();

  return (
    <ButtonLink {...props} ref={ref} onClick={forgetPasswordModal.show}>
      {t('account:security.forget-password.button')}
    </ButtonLink>
  );
});

export default ForgetPasswordButton;
