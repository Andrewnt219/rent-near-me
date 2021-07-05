import { UseControllerProps, useForm } from 'react-hook-form';
import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';
import RegisterForm from '@models/RegisterForm';
import { yupResolver } from '@hookform/resolvers/yup';

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

  const [firstName, lastName, email, password] = form.watch([
    'firstName',
    'lastName',
    'email',
    'password',
  ]);

  const passwordError = {
    reachesMinimumLength: RegisterForm.reachesMinimumLength(password),
    containsUpperLowerChars:
      RegisterForm.containsAnUpperCaseLetter(password) &&
      RegisterForm.containsALowerCaseLetter(password),
    containsSpecialCharOrNumber:
      RegisterForm.containsASpecialCharacter(password) ||
      RegisterForm.containsANumber(password),
    notContainsPersonalInfo:
      !RegisterForm.containsEmail(password, email) &&
      !RegisterForm.containsName(password, firstName) &&
      !RegisterForm.containsName(password, lastName),
  };

  return { onSubmit, form, controllers, submitError, passwordError };
}
