import { Controllers } from '@common-types';
import { yupResolver } from '@hookform/resolvers/yup';
import { validatePassword } from '@utils/validate-password-utils';
import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import EditPasswordModel from './EditPasswordModel';

export const useEditPasswordForm = () => {
  const { t } = useTranslation();

  const form = useForm<EditPasswordModel>({
    defaultValues: new EditPasswordModel(),
    resolver: yupResolver(EditPasswordModel.getValidationSchema(t)),
  });

  const [submitError, setSubmitError] = useState('');

  const password = form.watch('newPassword');
  const passwordValidationResults = validatePassword(password);

  const { control } = form;
  const controllers: Controllers<EditPasswordModel> = {
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
