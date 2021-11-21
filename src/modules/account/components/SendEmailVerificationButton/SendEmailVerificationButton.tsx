import { ComponentProps, FC, useEffect, useRef, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useSnackbar } from '@ui/Snackbar/SnackbarContext';
import { getErrorMessage } from '@utils/api-responses';
import AuthApi from '@services/AuthApi';
import { BaseProps, linkStyle } from '@ui/Button/styles';

type SendEmailVerificationButtonProps = ComponentProps<'button'> &
  BaseProps & {
    disableAfterClickMs?: number;
  };

const SendEmailVerificationButton: FC<SendEmailVerificationButtonProps> = ({
  disableAfterClickMs = 15000,
  children,
  disabled,
  ...props
}) => {
  const { t } = useTranslation();
  const snackbar = useSnackbar();
  const [internalDisableCountdown, setInternalDisableCountdown] = useState(0);
  const internalDisableTimer = useRef<number>();

  useEffect(() => {
    return () => {
      internalDisableTimer.current &&
        clearInterval(internalDisableTimer.current);
    };
  }, []);

  const onClick = async () => {
    setInternalDisableCountdown(disableAfterClickMs);
    internalDisableTimer.current = window.setInterval(
      () =>
        setInternalDisableCountdown((countdown) => {
          if (countdown - 1000 <= 0) {
            clearInterval(internalDisableTimer.current);
          }
          return countdown - 1000;
        }),
      1000
    );
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
    <button
      css={linkStyle}
      {...props}
      onClick={onClick}
      disabled={disabled || internalDisableCountdown > 0}
    >
      {children ?? t('account:security.verify-email.button')}
      {internalDisableCountdown > 0 &&
        ` (${t('account:security.verify-email.message.retry', {
          retryCountdown: internalDisableCountdown / 1000,
        })})`}
    </button>
  );
};

export default SendEmailVerificationButton;
