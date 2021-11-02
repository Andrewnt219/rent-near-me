import { Controllers } from '@common-types';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import {
  LoginFormSchema,
  LoginFormModel,
} from '@modules/user-auth/components/LoginForm/LoginFormModel';
import AuthService from '@services/AuthService';
import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export const useLoginForm = () => {
  const { t } = useTranslation();

  const formSchema = LoginFormSchema(t);
  const form = useForm<LoginFormModel>({
    defaultValues: formSchema.getDefault(),
    resolver: yupResolver(formSchema),
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

  const controllers: Controllers<LoginFormModel> = {
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
