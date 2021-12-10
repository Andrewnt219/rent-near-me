import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '@modules/user-auth/contexts/AuthContext';
import AuthApi from '@services/AuthApi';
import { validatePassword } from '@utils/validate-password-utils';
import useTranslation from 'next-translate/useTranslation';
import {
  ChangePasswordFormSchema,
  ChangePasswordFormModel,
} from './ChangePasswordFormModel';
import { useActionField } from '@modules/account/components/ActionField/ActionFieldContext';
import useUserProfile from '@modules/user-auth/hooks/useUserProfile';
import { useSnackbar } from '@ui/Snackbar/SnackbarContext';
import { getErrorMessage } from '@utils/api-responses';

const useChangePasswordForm = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { mutateProfile } = useUserProfile();
  const actionField = useActionField();
  const snackbar = useSnackbar();

  const formSchema = ChangePasswordFormSchema(t);
  const form = useForm<ChangePasswordFormModel>({
    defaultValues: formSchema.getDefault(),
    resolver: yupResolver(formSchema),
  });

  useEffect(() => {
    form.setValue('uid', user?.uid ?? '');
    form.setValue('email', user?.email ?? '');
  }, [form, user]);

  const onSubmit = form.handleSubmit((data) => {
    mutateProfile({ passwordLastUpdatedTime: new Date() }, false);
    actionField.showAlternativeContent();
    AuthApi.changePassword(data)
      .then(() =>
        snackbar.showSnackSuccess(
          t('account:security.change-password.message.success')
        )
      )
      .catch((e) => {
        snackbar.showSnackError(getErrorMessage(e, t));
        actionField.showMainContent();
      })
      .finally(() => mutateProfile());
  });

  const password = form.watch('newPassword');
  const passwordValidationResults = validatePassword(password);

  return {
    onSubmit,
    form,
    passwordValidationResults,
  };
};

export default useChangePasswordForm;
