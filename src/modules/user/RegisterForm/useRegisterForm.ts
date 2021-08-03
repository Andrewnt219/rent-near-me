import { yupResolver } from '@hookform/resolvers/yup';
import RegisterFormModel from '@modules/user/RegisterForm/RegisterFormModel';
import AuthService from '@modules/user/services/AuthService';
import { getErrorMessage } from '@utils/api-responses';
import { validatePassword } from '@utils/validate-password-utils';
import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';
import { UseControllerProps, useForm } from 'react-hook-form';

type Controllers = Record<
  keyof RegisterFormModel,
  UseControllerProps<RegisterFormModel>
>;

export default function useRegisterForm() {
  const { t } = useTranslation();
  const form = useForm<RegisterFormModel>({
    defaultValues: new RegisterFormModel(),
    resolver: yupResolver(RegisterFormModel.getValidationSchema(t)),
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

  const onSubmit = form.handleSubmit((data) => {
    AuthService.registerWithEmail(data).catch((e) =>
      setSubmitError(getErrorMessage(e, t))
    );
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
