import { yupResolver } from '@hookform/resolvers/yup';
import {
  LoginFormSchema,
  LoginFormModel,
} from '@modules/user-auth/components/LoginForm/LoginFormModel';
import AuthApi from '@services/AuthApi';
import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useModals } from '@ui/Modal/ModalContext';

const useLoginForm = () => {
  const { t } = useTranslation();
  const { loginModal } = useModals();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const formSchema = LoginFormSchema(t);
  const form = useForm<LoginFormModel>({
    defaultValues: formSchema.getDefault(),
    resolver: yupResolver(formSchema),
  });

  const onSubmit = form.handleSubmit(async (data) => {
    AuthApi.signInWithEmail(data.email, data.password, data.keepLogIn)
      .then(() => loginModal.hide())
      .catch((err) => setSubmitError(err.error_description || err.message));
  });

  const onLoginWithGoogle = async () => {
    await AuthApi.signInWithGoogle();
    loginModal.hide();
  };

  const onLoginWithFacebook = async () => {
    await AuthApi.signInWithFacebook();
    loginModal.hide();
  };

  return {
    onSubmit,
    form,
    submitError,
    onLoginWithGoogle,
    onLoginWithFacebook,
  };
};

export default useLoginForm;
