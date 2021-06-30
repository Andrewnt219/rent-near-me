import AuthService from '@services/AuthService';
import Form from '@ui/Form';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

type FormData = {
  email: string;
  password: string;
};

export default function Login() {
  const { t } = useTranslation();

  const { register, handleSubmit, formState } = useForm<FormData>();

  const onSubmit = handleSubmit(async (data) => {
    await AuthService.signInWithEmail(data.email, data.password).catch(
      (error) => alert(error.error_description || error.message)
    );
  });

  console.log({ errors: formState.errors });

  return (
    <div>
      <Form className="mb-4" onSubmit={onSubmit}>
        <p>
          Sign in with email and password (
          <Link href="/register">
            <a>No account?</a>
          </Link>
          )
        </p>
        <Form.Group>
          <Form.Label>
            Email
            <Form.TextField
              type="email"
              placeholder="Email"
              tw="mr-4"
              {...register('email', {
                required: t('common:errors.form.required'),
              })}
            />
          </Form.Label>

          <Form.ErrorMessage>
            {formState.errors.email?.message}
          </Form.ErrorMessage>
        </Form.Group>

        <Form.Group>
          <Form.Label>
            Password
            <Form.TextField
              type="password"
              placeholder="Password"
              tw="mr-4"
              {...register('email', {
                required: t('common:errors.form.required'),
              })}
            />
          </Form.Label>

          <Form.ErrorMessage>
            {formState.errors.email?.message}
          </Form.ErrorMessage>
        </Form.Group>

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
