import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useAuth } from '@modules/user-auth/contexts/AuthContext';
import AuthService from '@services/AuthService';
import { getErrorMessage } from '@utils/api-responses';
import { validatePassword } from '@utils/validate-password-utils';
import useTranslation from 'next-translate/useTranslation';
import {
  ChangePasswordFormSchema,
  ChangePasswordFormModel,
} from './ChangePasswordFormModel';
import { useActionField } from '@modules/account/contexts/ActionFieldContext';

export const useChangePasswordForm = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const actionField = useActionField();

  const formSchema = ChangePasswordFormSchema(t);
  const form = useForm<ChangePasswordFormModel>({
    defaultValues: formSchema.getDefault(),
    resolver: yupResolver(formSchema),
  });

  useEffect(() => {
    form.setValue('uid', user?.uid ?? '');
    form.setValue('email', user?.email ?? '');
  }, [form, user]);

  const onSubmit = form.handleSubmit((data) => {
    AuthService.changePassword(data)
      .then(() => actionField.showAlternativeContent())
      .catch((e) => setSubmitError(getErrorMessage(e, t)));
  });

  const password = form.watch('newPassword');

  const passwordValidationResults = validatePassword(password);

  return {
    onSubmit,
    form,
    submitError,
    passwordValidationResults,
  };
};
