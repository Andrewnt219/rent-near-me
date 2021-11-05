import DatePicker from '@libs/react-day-picker/DatePicker';
import { ButtonLink, ButtonPrimary } from '@ui/Button/Button';
import { GENDERS, MAXIMUM_DOB } from '@models/constnats';
import Form from '@ui/Form/Form';
import PasswordCheckList from '@ui/PasswordCheckList/PasswordCheckList';
import PasswordField from '@ui/Form/PasswordField';
import Row from '@ui/Row/Row';
import Select from '@ui/Form/Select';
import TextField from '@ui/Form/TextField';
import useTranslation from 'next-translate/useTranslation';
import { RiErrorWarningFill } from 'react-icons/ri';
import useRegisterForm from './useRegisterForm';
import { useLayoutModal } from '@modules/layouts/contexts/LayoutModalContext';

const RegisterForm = () => {
  const { form, onSubmit, submitError, passwordValidationResults } =
    useRegisterForm();
  const { t } = useTranslation();
  const { loginModal } = useLayoutModal();

  return (
    <Form form={form} noValidate onSubmit={onSubmit}>
      <div tw="mb-md flex flex-wrap justify-between items-center">
        <h4 tw="text-xl font-semibold">{t('common:register.welcome')}</h4>
        <ButtonLink type="button" onClick={loginModal.show}>
          {t('common:register.alreadyHasAccount')}
        </ButtonLink>
      </div>

      <Row>
        <TextField
          id="register-firstName"
          name="firstName"
          type="text"
          label={t('common:register.firstName.label')}
          inputDescription={t('common:register.firstName.description')}
        />

        <TextField
          id="register-lastName"
          name="lastName"
          type="text"
          label={t('common:register.lastName')}
        />
      </Row>

      <Row>
        <DatePicker
          id="register-dob"
          name="dob"
          label={t('common:register.dob.label')}
          inputDescription={t('common:register.dob.description')}
          dayPickerProps={{ disabledDays: { after: MAXIMUM_DOB } }}
        />

        <Select
          id="register-gender"
          name="gender"
          label={t('common:register.gender')}
        >
          <option value="" disabled></option>
          {Object.entries(GENDERS).map(([key, val]) => (
            <option key={key} value={key}>
              {val}
            </option>
          ))}
        </Select>
      </Row>

      <TextField
        id="register-email"
        name="email"
        type="email"
        label={t('common:register.email.label')}
        autoComplete="username"
        inputDescription={t('common:register.email.description')}
      />

      <PasswordField
        id="register-password"
        label={t('common:register.password')}
        name="password"
        autoComplete="new-password"
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
};

export default RegisterForm;
