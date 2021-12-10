import { yupResolver } from '@hookform/resolvers/yup';
import { useModals } from '@ui/Modal/ModalContext';
import {
  RegisterFormSchema,
  RegisterFormModel,
} from '@modules/user-auth/components/RegisterForm/RegisterFormModel';
import AuthApi from '@services/AuthApi';
import { getErrorMessage } from '@utils/api-responses';
import { validatePassword } from '@utils/validate-password-utils';
import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function useRegisterForm() {
  const { t } = useTranslation();
  const { registerModal } = useModals();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const formSchema = RegisterFormSchema(t);
  const form = useForm<RegisterFormModel>({
    defaultValues: formSchema.getDefault(),
    resolver: yupResolver(formSchema),
  });

  const onSubmit = form.handleSubmit(async (data) => {
    AuthApi.registerWithEmail(data)
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
