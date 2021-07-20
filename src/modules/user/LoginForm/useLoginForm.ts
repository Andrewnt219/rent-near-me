import { yupResolver } from '@hookform/resolvers/yup';
import LoginForm from '@models/LoginForm';
import AuthService from '@services/AuthService';
import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';
import { UseControllerProps, useForm } from 'react-hook-form';

type Controllers = Record<keyof LoginForm, UseControllerProps<LoginForm>>;

export const useLoginForm = () => {
  const { t } = useTranslation();

  const form = useForm<LoginForm>({
    defaultValues: new LoginForm(),
    resolver: yupResolver(LoginForm.getValidationSchema(t)),
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
