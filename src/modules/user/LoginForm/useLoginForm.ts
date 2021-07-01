import AuthService from '@services/AuthService';
import { isValidDate } from '@utils/validate-utils';
import useTranslation from 'next-translate/useTranslation';
import { UseControllerProps, useForm } from 'react-hook-form';

export type LoginFormData = {
  email: string;
  password: string;
  dob: string;
  keepLogIn: boolean;
};
type Controllers = Record<
  keyof LoginFormData,
  UseControllerProps<LoginFormData>
>;
export const useLoginForm = () => {
  const { t } = useTranslation();
  const form = useForm<LoginFormData>();
  const { control } = form;

  const onSubmit = form.handleSubmit(async (data) => {
    const parsedDate = new Date(data.dob);

    await AuthService.signInWithEmail(data.email, data.password).catch(
      (error) => alert(error.error_description || error.message)
    );
  });

  const controllers: Controllers = {
    dob: {
      control,
      name: 'dob',
      rules: {
        required: t('common:errors.form.required'),
        validate: (value) =>
          isValidDate(value) || t('common:errors.form.invalid-date'),
      },
    },
    email: {
      control,
      name: 'email',
      rules: { required: t('common:errors.form.required') },
    },
    password: {
      control,
      name: 'password',
      rules: { required: t('common:errors.form.required') },
    },
    keepLogIn: {
      control,
      name: 'keepLogIn',
      rules: { required: t('common:errors.form.required') },
    },
  };

  return { onSubmit, form, controllers };
};
