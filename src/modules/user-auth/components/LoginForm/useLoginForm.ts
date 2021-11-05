import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import {
  LoginFormSchema,
  LoginFormModel,
} from '@modules/user-auth/components/LoginForm/LoginFormModel';
import AuthService from '@services/AuthService';
import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLayoutModal } from '@modules/layouts/contexts/LayoutModalContext';

export const useLoginForm = () => {
  const { t } = useTranslation();
  const { loginModal } = useLayoutModal();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const formSchema = LoginFormSchema(t);
  const form = useForm<LoginFormModel>({
    defaultValues: formSchema.getDefault(),
    resolver: yupResolver(formSchema),
  });

  const onSubmit = form.handleSubmit(async (data) => {
    AuthService.signInWithEmail(data.email, data.password, data.keepLogIn)
      .then(() => loginModal.hide())
      .catch((err) => setSubmitError(err.error_description || err.message));
  });

  return { onSubmit, form, submitError };
};
