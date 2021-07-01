import DatePicker from '@libs/react-day-picker/DatePicker';
import AuthService from '@services/AuthService';
import Form from '@ui/Form';
import TextField from '@ui/TextField';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import { useLoginForm } from './useLoginForm';
export default function LoginForm() {
  const { controllers, form, onSubmit } = useLoginForm();
  const { t } = useTranslation();

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
          controller={controllers.email}
        />

        <TextField
          label="Password"
          type="password"
          id="login-password"
          inputDescription="Enter your registered password"
          controller={controllers.password}
        />

        <DatePicker controller={controllers.dob} />

        <button disabled={form.formState.isSubmitting}>
          <span>{form.formState.isSubmitting ? 'Loading' : 'Sign in'}</span>
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
