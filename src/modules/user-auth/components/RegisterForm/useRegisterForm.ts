import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useLayoutModal } from '@modules/layouts/contexts/LayoutModalContext';
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
  const { registerModal } = useLayoutModal();
  const [submitError, setSubmitError] = useState('');

  const formSchema = RegisterFormSchema(t);
  const form = useForm<RegisterFormModel>({
    defaultValues: formSchema.getDefault(),
    resolver: yupResolver(formSchema),
  });

  const onSubmit = form.handleSubmit(async (data) => {
    AuthService.registerWithEmail(data)
      .then(() => registerModal.hide())
      .catch((e) => setSubmitError(getErrorMessage(e, t)));
  });

  const password = form.watch('password');

  const passwordValidationResults = validatePassword(password);

  return {
    onSubmit,
    form,
    submitError,
    passwordValidationResults,
  };
}
