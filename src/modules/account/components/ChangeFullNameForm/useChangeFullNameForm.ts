import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useUserProfile } from '@modules/user-auth/hooks/useUserProfile';
import UserProfileApi from '@services/UserProfileApi';
import { useSnackbar } from '@ui/Snackbar/SnackbarContext';
import { getErrorMessage } from '@utils/api-responses';
import useTranslation from 'next-translate/useTranslation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useActionField } from '../ActionField/ActionFieldContext';
import {
  ChangeFullNameFormModel,
  ChangeFullNameFormSchema,
} from './ChangeFullNameFormModel';

const useChangeFullNameForm = () => {
  const { t } = useTranslation();
  const { profile, mutateProfile } = useUserProfile();
  const actionField = useActionField();
  const snackbar = useSnackbar();

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
    mutateProfile(data, false);
    actionField.showAlternativeContent();
    UserProfileApi.changeName(data)
      .then(() =>
        snackbar.showSnackSuccess(
          t('account:personal-info.change-name.message.success')
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

export default useChangeFullNameForm;
