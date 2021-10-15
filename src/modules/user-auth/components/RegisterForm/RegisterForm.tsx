import DatePicker from '@libs/react-day-picker/DatePicker';
import RegisterModel from '@modules/user-auth/components/RegisterForm/RegisterFormModel';
import { useLayoutModal } from '@modules/layouts/contexts/LayoutModalContext';
import { ButtonLink, ButtonPrimary } from '@ui/Button/Button';
import Form from '@ui/Form';
import PasswordCheckList from '@ui/PasswordCheckList/PasswordCheckList';
import PasswordField from '@ui/PasswordField';
import Row from '@ui/Row/Row';
import Select from '@ui/SelectField';
import TextField from '@ui/TextField';
import useTranslation from 'next-translate/useTranslation';
import { RiErrorWarningFill } from 'react-icons/ri';
import useRegisterForm from './useRegisterForm';

export default function RegisterForm() {
  const {
    controllers,
    form,
    onSubmit,
    submitError,
    passwordValidationResults,
  } = useRegisterForm();
  const { loginModal, registerModal } = useLayoutModal();
  const { t } = useTranslation();

  return (
    <Form noValidate onSubmit={onSubmit}>
      <div tw="mb-md flex flex-wrap justify-between items-center">
        <h4 tw="text-xl font-semibold">Welcome to RentNearMe!</h4>
        <ButtonLink
          type="button"
          onClick={() => {
            registerModal.hide();
            loginModal.show();
          }}
        >
          Already have an account?
        </ButtonLink>
      </div>

      <Row>
        <TextField
          label={t('common:register.firstName.label')}
          type="text"
          id="register-firstName"
          controller={controllers.firstName}
          inputDescription={t('common:register.firstName.description')}
        />

        <TextField
          label={t('common:register.lastName')}
          type="text"
          id="register-lastName"
          controller={controllers.lastName}
        />
      </Row>

      <Row>
        <DatePicker
          label={t('common:register.dob.label')}
          controller={controllers.dob}
          inputDescription={t('common:register.dob.description')}
        />

        <Select
          label={t('common:register.gender')}
          id="register-gender"
          controller={controllers.gender}
        >
          <option value="" disabled></option>
          {Object.entries(RegisterModel.genders).map(([key, val], idx) => (
            <option key={key} value={key}>
              {val}
            </option>
          ))}
        </Select>
      </Row>

      <TextField
        label={t('common:register.email.label')}
        type="email"
        id="register-email"
        autoComplete="username"
        controller={controllers.email}
        inputDescription={t('common:register.email.description')}
      />

      <PasswordField
        label={t('common:register.password')}
        id="register-password"
        autoComplete="new-password"
        controller={controllers.password}
      />

      <PasswordCheckList
        passwordValidationResults={passwordValidationResults}
        tw="mb-sm"
      />

      {submitError && (
        <Form.ErrorMessage
          role="alert"
          aria-relevant="text"
          tw="flex items-center gap-sm mb-sm"
        >
          <RiErrorWarningFill tw="w-5 h-5 fill-current" />
          {submitError}
        </Form.ErrorMessage>
      )}

      <ButtonPrimary
        size="md"
        type="submit"
        tw="block w-full mt-md"
        disabled={form.formState.isSubmitting}
      >
        {form.formState.isSubmitting
          ? t('common:register.loading')
          : t('common:register.register')}
      </ButtonPrimary>
    </Form>
  );
}
