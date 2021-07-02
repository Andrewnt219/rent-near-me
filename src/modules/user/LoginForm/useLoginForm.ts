import AuthService from '@services/AuthService';
import { isValidDate } from '@utils/validate-utils';
import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';
import { UseControllerProps, useForm } from 'react-hook-form';

export type LoginFormData = {
  email: string;
  password: string;
  keepLogIn: boolean;
};
type Controllers = Record<
  keyof LoginFormData,
  UseControllerProps<LoginFormData>
>;

// Important so that input value will not change from controlled to uncontrolled
// (because of undefined)
const defaultValues: LoginFormData = {
  email: '',
  keepLogIn: false,
  password: '',
};
export const useLoginForm = () => {
  const { t } = useTranslation();

  const form = useForm<LoginFormData>({ defaultValues });
  const { control } = form;

  const [submitError, setSubmitError] = useState('');

  const onSubmit = form.handleSubmit(async (data) => {
    await AuthService.signInWithEmail(data.email, data.password).catch((err) =>
      setSubmitError(err.error_description || err.message)
    );
  });

  const controllers: Controllers = {
    email: {
      control,
      name: 'email',
      rules: { required: t('common:errors.form.required') },
    },
    password: {
      control,
      name: 'password',
      rules: { required: t('common:errors.form.required') },
    },
    keepLogIn: {
      control,
      name: 'keepLogIn',
    },
  };

  return { onSubmit, form, controllers, submitError };
};
