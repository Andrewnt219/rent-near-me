import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useUserProfile } from '@modules/user-auth/hooks/useUserProfile';
import UserProfileService from '@services/UserProfileService';
import dayjs from 'dayjs';
import useTranslation from 'next-translate/useTranslation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useActionField } from '../ActionField/ActionFieldContext';
import { ChangeDobFormModel, ChangeDobFormSchema } from './ChangeDobFormModel';

const useChangeDobForm = () => {
  const { t } = useTranslation();
  const { profile, mutateProfile } = useUserProfile();
  const actionField = useActionField();

  const formSchema = ChangeDobFormSchema(t);
  const form = useForm<ChangeDobFormModel>({
    defaultValues: formSchema.getDefault(),
    resolver: yupResolver(formSchema),
  });

  useEffect(() => {
    if (profile?.dob) {
      form.setValue('dob', dayjs(profile.dob).toDate());
    }
  }, [form, profile]);

  const onSubmit = form.handleSubmit((data) => {
    mutateProfile(data, false);
    actionField.showAlternativeContent();
    UserProfileService.changeDateOfBirth(data)
      .catch((e) => actionField.showMainContent())
      .finally(() => mutateProfile());
  });

  return {
    onSubmit,
    form,
  };
};

export default useChangeDobForm;
