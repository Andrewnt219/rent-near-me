import DatePicker from '@libs/react-day-picker/DatePicker';
import RegisterModel from '@models/RegisterForm';
import { ButtonLink, ButtonPrimary } from '@ui/Button/Button';
import Form from '@ui/Form';
import PasswordField from '@ui/PasswordField';
import Row from '@ui/Row/Row';
import Select from '@ui/SelectField';
import TextField from '@ui/TextField';
import useTranslation from 'next-translate/useTranslation';
import { FC } from 'react';
import { IoCloseOutline, IoCheckmarkOutline } from 'react-icons/io5';
import tw, { styled } from 'twin.macro';
import useRegisterForm from './useRegisterForm';

export default function RegisterForm() {
  const { controllers, form, onSubmit, submitError, passwordError } =
    useRegisterForm();
  const { t } = useTranslation();

  return (
    <Form noValidate onSubmit={onSubmit}>
      <div tw="mb-4 flex flex-wrap justify-between items-center">
        <h4 tw="text-xl font-semibold">Welcome to RentNearMe!</h4>
        <ButtonLink type="button">Already have an account?</ButtonLink>
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
            <option key={key} value="key">
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

      <div tw="mb-md">
        <PasswordCriteria isQualified={passwordError.reachesMinimumLength}>
          At least 8 characters
        </PasswordCriteria>
        <PasswordCriteria isQualified={passwordError.containsUpperLowerChars}>
          Contains a lowercase letter and an uppercase letter
        </PasswordCriteria>
        <PasswordCriteria isQualified={passwordError.notContainsPersonalInfo}>
          Can&apos;t contain your name or email address
        </PasswordCriteria>
        <PasswordCriteria
          isQualified={passwordError.containsSpecialCharOrNumber}
        >
          Contains a number or symbol
        </PasswordCriteria>
      </div>

      <ButtonPrimary
        size="xl"
        type="submit"
        tw="block w-full"
        disabled={form.formState.isSubmitting}
      >
        {form.formState.isSubmitting
          ? t('common:register.loading')
          : t('common:register.register')}
      </ButtonPrimary>
    </Form>
  );
}

type PasswordCriteriaProps = {
  isQualified: boolean;
};
const StyledPassworCriteria = styled.p<PasswordCriteriaProps>`
  ${tw`text-xs font-semibold`}
  ${tw`flex items-center gap-sm mb-0`};
  ${tw`text-danger`}

  &:not(:last-child) {
    ${tw`mb-1`}
  }

  ${(props) => props.isQualified && tw`text-success`}

  svg {
    ${tw`fill-current w-4 h-4`}
  }
`;
const PasswordCriteria: FC<PasswordCriteriaProps> = ({
  isQualified,
  children,
}) => {
  return (
    <StyledPassworCriteria isQualified={isQualified}>
      {isQualified ? <IoCheckmarkOutline /> : <IoCloseOutline />}
      {children}
    </StyledPassworCriteria>
  );
};
