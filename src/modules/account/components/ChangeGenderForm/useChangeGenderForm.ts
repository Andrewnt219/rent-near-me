import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useUserProfile } from '@modules/user-auth/hooks/useUserProfile';
import UserProfileService from '@services/UserProfileService';
import useTranslation from 'next-translate/useTranslation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useActionField } from '../ActionField/ActionFieldContext';
import {
  ChangeGenderFormModel,
  ChangeGenderFormSchema,
} from './ChangeGenderFormModel';

const useChangeGenderForm = () => {
  const { t } = useTranslation();
  const { profile, mutateProfile } = useUserProfile();
  const actionField = useActionField();

  const formSchema = ChangeGenderFormSchema(t);
  const form = useForm<ChangeGenderFormModel>({
    defaultValues: formSchema.getDefault(),
    resolver: yupResolver(formSchema),
  });

  useEffect(() => {
    form.setValue('gender', profile?.gender ?? '');
  }, [form, profile]);

  const onSubmit = form.handleSubmit((data) => {
    mutateProfile(data, false);
    actionField.showAlternativeContent();
    UserProfileService.changeGender(data)
      .catch((e) => actionField.showMainContent())
      .finally(() => mutateProfile());
  });

  return {
    onSubmit,
    form,
  };
};

export default useChangeGenderForm;
