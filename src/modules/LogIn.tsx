import DatePicker from '@libs/react-day-picker/DatePicker';
import AuthService from '@services/AuthService';
import Form from '@ui/Form';
import TextField from '@ui/TextField';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

type FormData = {
  email: string;
  password: string;
  dob: Date;
};

export default function Login() {
  const { t } = useTranslation();

  const { control, register, handleSubmit, formState } = useForm<FormData>();

  const onSubmit = handleSubmit(async (data) => {
    debugger;
    await AuthService.signInWithEmail(data.email, data.password).catch(
      (error) => alert(error.error_description || error.message)
    );
  });

  return (
    <div>
      <Form noValidate className="mb-4" onSubmit={onSubmit}>
        <p>
          Sign in with email and password (
          <Link href="/register">
            <a>No account?</a>
          </Link>
          )
        </p>

        <TextField
          label="Email"
          type="email"
          id="login-email"
          inputDescription="Enter your registered email"
          errorMessage={formState.errors.email?.message}
          {...register('email', {
            required: t('common:errors.form.required'),
          })}
        />

        <TextField
          label="Password"
          type="password"
          id="login-password"
          inputDescription="Enter your registered password"
          errorMessage={formState.errors.password?.message}
          {...register('password', {
            required: t('common:errors.form.required'),
          })}
        />

        <DatePicker
          control={control}
          name="dob"
          rules={{ required: t('common:errors.form.required') }}
        />

        <button disabled={formState.isSubmitting}>
          <span>{formState.isSubmitting ? 'Loading' : 'Sign in'}</span>
        </button>
      </Form>

      <button
        type="button"
        onClick={async (e) => await AuthService.signInWithGoogle()}
        className="block"
      >
        {t('common:login.google')}
      </button>

      <button
        onClick={async (e) => await AuthService.signInWithFacebook()}
        className="block"
      >
        {t('common:login.facebook')}
      </button>
    </div>
  );
}
