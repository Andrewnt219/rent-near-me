import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useAuth } from '@modules/user-auth/contexts/AuthContext';
import AuthService from '@services/AuthService';
import { getErrorMessage, updateResponseData } from '@utils/api-responses';
import useTranslation from 'next-translate/useTranslation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useActionField } from '../ActionField/ActionFieldContext';
import {
  ChangeFullNameFormModel,
  ChangeFullNameFormSchema,
} from './ChangeFullNameFormModel';

const useChangeFullNameForm = () => {
  const { t } = useTranslation();
  const { profile, mutateProfile } = useAuth();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const actionField = useActionField();

  const formSchema = ChangeFullNameFormSchema(t);
  const form = useForm<ChangeFullNameFormModel>({
    defaultValues: formSchema.getDefault(),
    resolver: yupResolver(formSchema),
  });

  useEffect(() => {
    form.setValue('firstName', profile?.firstName ?? '');
    form.setValue('lastName', profile?.lastName ?? '');
  }, [form, profile]);

  const onSubmit = form.handleSubmit((data) => {
    mutateProfile((res) => updateResponseData(res, data), false);
    AuthService.changeName(data)
      .then(() => actionField.showAlternativeContent())
      .catch((e) => setSubmitError(getErrorMessage(e, t)))
      .finally(() => mutateProfile());
  });

  return {
    onSubmit,
    form,
    submitError,
  };
};

export default useChangeFullNameForm;
