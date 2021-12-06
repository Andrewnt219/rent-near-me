import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import useUserProfile from '@modules/user-auth/hooks/useUserProfile';
import UserProfileApi from '@services/UserProfileApi';
import useTranslation from 'next-translate/useTranslation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useActionField } from '../ActionField/ActionFieldContext';
import { ChangeDobFormModel, ChangeDobFormSchema } from './ChangeDobFormModel';
import { useSnackbar } from '@ui/Snackbar/SnackbarContext';
import { getErrorMessage } from '@utils/api-responses';

const useChangeDobForm = () => {
  const { t } = useTranslation();
  const { profile, mutateProfile } = useUserProfile();
  const actionField = useActionField();
  const snackbar = useSnackbar();

  const formSchema = ChangeDobFormSchema(t);
  const form = useForm<ChangeDobFormModel>({
    defaultValues: formSchema.getDefault(),
    resolver: yupResolver(formSchema),
  });

  useEffect(() => {
    if (profile?.dob) {
      form.setValue('dob', profile.dob);
    }
  }, [form, profile]);

  const onSubmit = form.handleSubmit((data) => {
    mutateProfile(data, false);
    actionField.showAlternativeContent();
    UserProfileApi.changeDateOfBirth(data)
      .then(() =>
        snackbar.showSnackSuccess(
          t('account:personal-info.change-dob.message.success')
        )
      )
      .catch((e) => {
        snackbar.showSnackError(getErrorMessage(e, t));
        actionField.showMainContent();
      })
      .finally(() => mutateProfile());
  });

  return {
    onSubmit,
    form,
  };
};

export default useChangeDobForm;
