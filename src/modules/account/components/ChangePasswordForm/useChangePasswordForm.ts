import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Controllers } from '@common-types';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '@modules/user-auth/AuthContext';
import AuthService from '@modules/user-auth/services/AuthService';
import { getErrorMessage } from '@utils/api-responses';
import { validatePassword } from '@utils/validate-password-utils';
import useTranslation from 'next-translate/useTranslation';
import ChangePasswordFormModel from './ChangePasswordFormModel';

export const useChangePasswordForm = () => {
  const { t } = useTranslation();

  const form = useForm<ChangePasswordFormModel>({
    defaultValues: new ChangePasswordFormModel(),
    resolver: yupResolver(ChangePasswordFormModel.getValidationSchema(t)),
  });

  const { user } = useAuth();

  useEffect(() => {
    form.setValue('uid', user?.uid ?? '');
    form.setValue('email', user?.email ?? '');
  }, [form, user]);

  const password = form.watch('newPassword');
  const passwordValidationResults = validatePassword(password);

  const { control } = form;
  const controllers: Controllers<ChangePasswordFormModel> = {
    uid: {
      name: 'uid',
      control,
    },
    email: {
      name: 'email',
      control,
    },
    oldPassword: {
      name: 'oldPassword',
      control,
    },
    newPassword: {
      name: 'newPassword',
      control,
    },
    confirmNewPassword: {
      name: 'confirmNewPassword',
      control,
    },
  };

  const [submitError, setSubmitError] = useState('');
  const onSubmit = form.handleSubmit((data) => {
    AuthService.changePassword(data).catch((e) =>
      setSubmitError(getErrorMessage(e, t))
    );
  });

  return {
    onSubmit,
    form,
    controllers,
    submitError,
    passwordValidationResults,
  };
};
