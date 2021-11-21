import React, { forwardRef, useEffect, useRef, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useSnackbar } from '@ui/Snackbar/SnackbarContext';
import { getErrorMessage } from '@utils/api-responses';
import AuthApi from '@services/AuthApi';
import { ButtonProps, ButtonLink } from '@ui/Button/Button';

type SendEmailVerificationButtonProps = ButtonProps & {
  disableAfterClickMs?: number;
};

const SendEmailVerificationButton = forwardRef<
  HTMLButtonElement,
  SendEmailVerificationButtonProps
>(({ disableAfterClickMs = 15000, children, disabled, ...props }, ref) => {
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
    <ButtonLink
      {...props}
      onClick={onClick}
      disabled={disabled || internalDisableCountdown > 0}
      ref={ref}
    >
      {children ?? t('account:security.verify-email.button')}
      {internalDisableCountdown > 0 &&
        ` (${t('account:security.verify-email.message.retry', {
          retryCountdown: internalDisableCountdown / 1000,
        })})`}
    </ButtonLink>
  );
});

export default SendEmailVerificationButton;
