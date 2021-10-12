import { Controllers } from '@common-types';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '@modules/user-auth/AuthContext';
import { validatePassword } from '@utils/validate-password-utils';
import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import ChangePasswordModel from './ChangePasswordModel';

export const useChangePasswordForm = () => {
  const { t } = useTranslation();

  const form = useForm<ChangePasswordModel>({
    defaultValues: new ChangePasswordModel(),
    resolver: yupResolver(ChangePasswordModel.getValidationSchema(t)),
  });

  const { user } = useAuth();
  form.setValue('uid', user?.uid ?? '');
  form.setValue('email', user?.email ?? '');

  const password = form.watch('newPassword');
  const passwordValidationResults = validatePassword(password);

  const { control } = form;
  const controllers: Controllers<ChangePasswordModel> = {
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
  // TODO #55 validate old password and update new password
  const onSubmit = form.handleSubmit((data) => {
    console.log(data);
  });

  return {
    onSubmit,
    form,
    controllers,
    submitError,
    passwordValidationResults,
  };
};
