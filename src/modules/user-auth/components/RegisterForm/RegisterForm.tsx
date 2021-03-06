import DateField from '@ui/Form/DateField';
import { GENDERS, MAXIMUM_DOB } from '@models/constnats';
import Form from '@ui/Form/Form';
import PasswordField from '@ui/Form/PasswordField';
import Select from '@ui/Form/Select';
import TextField from '@ui/Form/TextField';
import PasswordCheckList from '@ui/PasswordCheckList/PasswordCheckList';
import { InputRow } from '@ui/Row/Row';
import Text from '@ui/Text/Text';
import useTranslation from 'next-translate/useTranslation';
import useRegisterForm from './useRegisterForm';
import { useModals } from '@ui/Modal/ModalContext';
import { Icon } from '@iconify/react';
import closeCircleFill from '@iconify/icons-eva/close-circle-fill';
import { Button } from '@ui/Button';

const RegisterForm = () => {
  const { form, onSubmit, submitError, passwordValidationResults } =
    useRegisterForm();
  const { t } = useTranslation();
  const { loginModal } = useModals();

  return (
    <Form form={form} noValidate onSubmit={onSubmit}>
      <div tw="mb-md flex flex-wrap justify-between items-center">
        <Text component="h4" variant="h4">
          {t('common:register.welcome')}
        </Text>

        <Button type="button" variant="link" onClick={loginModal.show}>
          {t('common:register.alreadyHasAccount')}
        </Button>
      </div>

      <InputRow>
        <TextField
          name="firstName"
          type="text"
          label={t('common:register.firstName.label')}
          autoCapitalize="words"
          autoComplete="given-name"
          inputDescription={t('common:register.firstName.description')}
        />

        <TextField
          name="lastName"
          type="text"
          label={t('common:register.lastName')}
          autoCapitalize="words"
          autoComplete="family-name"
        />
      </InputRow>

      <InputRow>
        <DateField
          name="dob"
          label={t('common:register.dob.label')}
          inputDescription={t('common:register.dob.description')}
          dayPickerProps={{ disabledDays: { after: MAXIMUM_DOB } }}
          inputProps={{ 'auto-capitalize': 'words', autoComplete: 'bday' }}
        />

        <Select
          name="gender"
          label={t('common:register.gender')}
          autoComplete="sex"
        >
          <option value="" disabled></option>
          {Object.entries(GENDERS).map(([key, val]) => (
            <option key={key} value={key}>
              {val}
            </option>
          ))}
        </Select>
      </InputRow>

      <TextField
        name="email"
        type="email"
        label={t('common:register.email.label')}
        autoComplete="username"
        inputDescription={t('common:register.email.description')}
      />

      <PasswordField
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
          <Icon tw="w-5 h-5 fill-current" icon={closeCircleFill} />
          {submitError}
        </Form.ErrorMessage>
      )}

      <Button
        type="submit"
        size="md"
        variant="primary"
        tw="block w-full mt-md"
        disabled={form.formState.isSubmitting}
      >
        {form.formState.isSubmitting
          ? t('common:register.submitButton.loading')
          : t('common:register.submitButton.submit')}
      </Button>
    </Form>
  );
};

export default RegisterForm;
