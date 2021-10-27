import { Controllers } from '@common-types';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  RegisterFormSchema,
  RegisterFormModel,
} from '@modules/user-auth/components/RegisterForm/RegisterFormModel';
import AuthService from '@services/AuthService';
import { getErrorMessage } from '@utils/api-responses';
import { validatePassword } from '@utils/validate-password-utils';
import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function useRegisterForm() {
  const { t } = useTranslation();

  const formSchema = RegisterFormSchema(t);
  const form = useForm<RegisterFormModel>({
    defaultValues: formSchema.getDefault(),
    resolver: yupResolver(formSchema),
  });
  const { control } = form;

  const [submitError, setSubmitError] = useState('');

  const controllers: Controllers<RegisterFormModel> = {
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
