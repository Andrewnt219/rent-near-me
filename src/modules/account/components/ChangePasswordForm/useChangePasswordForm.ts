import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useAuth } from '@modules/user-auth/contexts/AuthContext';
import AuthService from '@services/AuthService';
import { validatePassword } from '@utils/validate-password-utils';
import useTranslation from 'next-translate/useTranslation';
import {
  ChangePasswordFormSchema,
  ChangePasswordFormModel,
} from './ChangePasswordFormModel';
import { useActionField } from '@modules/account/components/ActionField/ActionFieldContext';
import { useUserProfile } from '@modules/user-auth/hooks/useUserProfile';

const useChangePasswordForm = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { mutateProfile } = useUserProfile();
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
    mutateProfile({ passwordLastUpdatedTime: new Date() }, false);
    actionField.showAlternativeContent();
    AuthService.changePassword(data)
      .catch((e) => actionField.showMainContent())
      .finally(() => mutateProfile());
  });

  const password = form.watch('newPassword');
  const passwordValidationResults = validatePassword(password);

  return {
    onSubmit,
    form,
    passwordValidationResults,
  };
};

export default useChangePasswordForm;
