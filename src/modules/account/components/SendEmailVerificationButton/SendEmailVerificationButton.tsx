import { ComponentProps, FC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useSnackbar } from '@ui/Snackbar/SnackbarContext';
import { getErrorMessage } from '@utils/api-responses';
import AuthApi from '@services/AuthApi';
import { BaseProps, linkStyle } from '@ui/Button/styles';

type SendEmailVerificationButtonProps = ComponentProps<'button'> & BaseProps;

const SendEmailVerificationButton: FC<SendEmailVerificationButtonProps> = ({
  children,
  ...props
}) => {
  const { t } = useTranslation();
  const snackbar = useSnackbar();

  const onClick = async () => {
    try {
      await AuthApi.sendEmailVerification();
      snackbar.showSnackSuccess(
        t('account:security.verify-email.message.success')
      );
    } catch (e) {
      snackbar.showSnackError(getErrorMessage(e, t));
    }
  };

  return (
    <button css={linkStyle} {...props} onClick={onClick}>
      {children ?? t('account:security.verify-email.button')}
    </button>
  );
};

export default SendEmailVerificationButton;
