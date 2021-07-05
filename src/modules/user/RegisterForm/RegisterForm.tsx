import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import tw, { styled } from 'twin.macro';
import useRegisterForm from './useRegisterForm';
import Form from '@ui/Form';
import TextField from '@ui/TextField';
import DatePicker from '@libs/react-day-picker/DatePicker';
import { ButtonLg } from '@ui/Button';
import RegisterModel from '@models/RegisterForm';
import PasswordField from '@ui/PasswordField';
import Select from '@ui/SelectField';
import PwdCheckIcon from '@assets/ic-pwd-check.svg';
import PwdTimesIcon from '@assets/ic-pwd-times.svg';

export default function RegisterForm() {
  const { controllers, form, onSubmit, submitError, passwordError } =
    useRegisterForm();
  const { t } = useTranslation();
  return (
    <Form noValidate onSubmit={onSubmit}>
      <Form.Row>
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
      </Form.Row>

      <Form.Row>
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
            <option key={key} value="key">
              {val}
            </option>
          ))}
        </Select>
      </Form.Row>

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

      <div tw="mb-md">
        <PasswordCriteria qualified={passwordError.reachesMinimumLength}>
          At least 8 characters
        </PasswordCriteria>
        <PasswordCriteria qualified={passwordError.containsUpperLowerChars}>
          Contains a lowercase letter and an uppercase letter
        </PasswordCriteria>
        <PasswordCriteria qualified={passwordError.notContainsPersonalInfo}>
          Can&apos;t contain your name or email address
        </PasswordCriteria>
        <PasswordCriteria qualified={passwordError.containsSpecialCharOrNumber}>
          Contains a number or symbol
        </PasswordCriteria>
      </div>

      <ButtonLg
        type="submit"
        tw="block w-full"
        disabled={form.formState.isSubmitting}
      >
        {form.formState.isSubmitting
          ? t('common:register.loading')
          : t('common:register.register')}
      </ButtonLg>
    </Form>
  );
}

const StyledPassworCriteria = styled.p`
  ${tw`text-xs font-semibold`}
  ${tw`flex items-center gap-sm mb-0`};
  ${tw`text-danger`}

  &:not(:last-child) {
    ${tw`mb-1`}
  }

  &.qualified {
    ${tw`text-success`};
  }
`;
type PasswordCriteriaProps = {
  qualified: boolean;
};
const PasswordCriteria: FC<PasswordCriteriaProps> = ({
  qualified,
  children,
}) => {
  return (
    <StyledPassworCriteria className={qualified ? 'qualified' : ''}>
      {qualified ? (
        <PwdCheckIcon tw="w-3 h-3" />
      ) : (
        <PwdTimesIcon tw="w-2 h-2" />
      )}
      <span>{children}</span>
    </StyledPassworCriteria>
  );
};
