import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Controllers } from '@common-types';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useAuth } from '@modules/user-auth/contexts/AuthContext';
import AuthService from '@services/AuthService';
import { getErrorMessage } from '@utils/api-responses';
import { validatePassword } from '@utils/validate-password-utils';
import useTranslation from 'next-translate/useTranslation';
import {
  ChangePasswordFormSchema,
  ChangePasswordFormModel,
} from './ChangePasswordFormModel';

export const useChangePasswordForm = () => {
  const { t } = useTranslation();

  const formSchema = ChangePasswordFormSchema(t);
  const form = useForm<ChangePasswordFormModel>({
    defaultValues: formSchema.getDefault(),
    resolver: yupResolver(formSchema),
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
