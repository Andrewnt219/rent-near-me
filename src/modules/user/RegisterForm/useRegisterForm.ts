import { yupResolver } from '@hookform/resolvers/yup';
import RegisterForm from '@models/RegisterForm';
import { validatePassword } from '@utils/validate-password-utils';
import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';
import { UseControllerProps, useForm } from 'react-hook-form';

type Controllers = Record<keyof RegisterForm, UseControllerProps<RegisterForm>>;

export default function useRegisterForm() {
  const { t } = useTranslation();
  const form = useForm<RegisterForm>({
    defaultValues: new RegisterForm(),
    resolver: yupResolver(RegisterForm.getValidationSchema(t)),
  });
  const { control } = form;

  const [submitError, setSubmitError] = useState('');

  const controllers: Controllers = {
    firstName: {
      control,
      name: 'firstName',
    },
    lastName: {
      control,
      name: 'lastName',
    },
    gender: {
      control,
      name: 'gender',
    },
    dob: {
      control,
      name: 'dob',
    },
    email: {
      control,
      name: 'email',
    },
    password: {
      control,
      name: 'password',
    },
  };

  const onSubmit = form.handleSubmit(async (data) => {
    console.log(data);
  });

  const password = form.watch('password');

  const passwordValidationResults = validatePassword(password);

  return {
    onSubmit,
    form,
    controllers,
    submitError,
    passwordValidationResults,
  };
}
