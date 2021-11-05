import DatePicker from '@libs/react-day-picker/DatePicker';
import { Genders } from '@models/constnats';
import { useLayoutModal } from '@modules/layouts/contexts/LayoutModalContext';
import { ButtonLink, ButtonPrimary } from '@ui/Button/Button';
import Form from '@ui/Form/Form';
import PasswordField from '@ui/Form/PasswordField';
import Select from '@ui/Form/SelectField';
import TextField from '@ui/Form/TextField';
import PasswordCheckList from '@ui/PasswordCheckList/PasswordCheckList';
import Row, { InputRow } from '@ui/Row/Row';
import Text from '@ui/Text/Text';
import useTranslation from 'next-translate/useTranslation';
import { Icon } from '@iconify/react';
import useRegisterForm from './useRegisterForm';
import tw from 'twin.macro';
const RegisterForm = () => {
  const {
    controllers,
    form,
    onSubmit,
    submitError,
    passwordValidationResults,
  } = useRegisterForm();
  const { t } = useTranslation();
  const { loginModal } = useLayoutModal();

  return (
    <Form noValidate onSubmit={onSubmit}>
      <div tw="mb-md flex flex-wrap justify-between items-center">
        <Text component="h4" variant="h4">
          Welcome to RentNearMe!
        </Text>

        <ButtonLink type="button" onClick={loginModal.show}>
          Already have an account?
        </ButtonLink>
      </div>

      <InputRow>
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
      </InputRow>

      <InputRow>
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
          {Object.entries(Genders).map(([key, val]) => (
            <option key={key} value={key}>
              {val}
            </option>
          ))}
        </Select>
      </InputRow>

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
          <Icon tw="w-5 h-5 fill-current" icon="mdi:alert-circle" />
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
