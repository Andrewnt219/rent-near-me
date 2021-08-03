import { yupResolver } from '@hookform/resolvers/yup';
import LoginFormModel from '@modules/user-auth/components/LoginForm/LoginFormModel';
import AuthService from '@modules/user-auth/services/AuthService';
import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';
import { UseControllerProps, useForm } from 'react-hook-form';

type Controllers = Record<
  keyof LoginFormModel,
  UseControllerProps<LoginFormModel>
>;

export const useLoginForm = () => {
  const { t } = useTranslation();

  const form = useForm<LoginFormModel>({
    defaultValues: new LoginFormModel(),
    resolver: yupResolver(LoginFormModel.getValidationSchema(t)),
  });
  const { control } = form;

  const [submitError, setSubmitError] = useState('');

  const onSubmit = form.handleSubmit(async (data) => {
    await AuthService.signInWithEmail(
      data.email,
      data.password,
      data.keepLogIn
    ).catch((err) => setSubmitError(err.error_description || err.message));
  });

  const controllers: Controllers = {
    email: {
      control,
      name: 'email',
    },
    password: {
      control,
      name: 'password',
    },
    keepLogIn: {
      control,
      name: 'keepLogIn',
    },
  };

  return { onSubmit, form, controllers, submitError };
};
