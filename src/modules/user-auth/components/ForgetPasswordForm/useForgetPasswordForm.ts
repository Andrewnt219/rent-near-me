import { yupResolver } from '@hookform/resolvers/yup';
import AuthApi from '@services/AuthApi';
import useTranslation from 'next-translate/useTranslation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useModals } from '@ui/Modal/ModalContext';
import {
  ForgetPasswordFormModel,
  ForgetPasswordFormSchema,
} from './ForgetPasswordFormModel';
import { useSnackbar } from '@ui/Snackbar/SnackbarContext';
import { useAuth } from '@modules/user-auth/contexts/AuthContext';

const useForgetPasswordForm = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { forgetPasswordModal } = useModals();
  const snackbar = useSnackbar();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const formSchema = ForgetPasswordFormSchema(t);
  const form = useForm<ForgetPasswordFormModel>({
    defaultValues: formSchema.getDefault(),
    resolver: yupResolver(formSchema),
  });

  useEffect(() => {
    form.setValue('email', user?.email ?? '');
  }, [form, user]);

  const onSubmit = form.handleSubmit(async (data) => {
    AuthApi.sendEmailResetPassword(data.email)
      .then(() => {
        forgetPasswordModal.hide();
        snackbar.showSnackSuccess(t('common:forgetPassword.message.success'));
      })
      .catch((err) => setSubmitError(err.error_description || err.message));
  });

  return {
    onSubmit,
    form,
    submitError,
  };
};

export default useForgetPasswordForm;
