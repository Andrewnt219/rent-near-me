import * as yup from 'yup';
import { Translate } from 'next-translate';

export default class RegisterForm {
  firstName = '';
  lastName = '';
  gender = '';
  dob = null;
  email = '';
  password = '';

  static genders = {
    male: 'Male',
    female: 'Female',
    other: 'Other',
    'not-given': 'Prefer not to say',
  };

  static getValidationSchema(t?: Translate) {
    const requiredMessage = t ? t('common:errors.form.required') : undefined;
    const emailMessage = t ? t('common:errors.form.invalid-email') : undefined;
    const selectMessage = t
      ? t('common:errors.form.unselected-dropdown')
      : undefined;
    const weakPasswordMessage = t
      ? t('common:errors.form.weak-password')
      : 'weak password';
    return yup.object().shape({
      firstName: yup.string().required(requiredMessage).trim(),
      lastName: yup.string().required(requiredMessage).trim(),
      gender: yup
        .string()
        .required(requiredMessage)
        .trim()
        .oneOf(Object.keys(RegisterForm.genders), selectMessage),
      dob: yup.date().nullable().required(requiredMessage).max(new Date()),
      email: yup.string().required(requiredMessage).trim().email(emailMessage),
      password: yup
        .string()
        .required(requiredMessage)
        .max(50)
        .test(
          'is-strong-password',
          weakPasswordMessage,
          RegisterForm.validatePassword
        ),
    });
  }

  private static validatePassword(
    password: string | undefined,
    context: yup.TestContext<Record<string, any>>
  ) {
    const atLeast8CharsLong = RegisterForm.reachesMinimumLength(password);

    const containsAnUppercaseLetter =
      RegisterForm.containsAnUpperCaseLetter(password);

    const containsALowerCaseLetter =
      RegisterForm.containsALowerCaseLetter(password);

    const notContainsEmail = !RegisterForm.containsEmail(
      password,
      context.parent.email
    );
    const notContainsFirstName = !RegisterForm.containsName(
      password,
      context.parent.firstName
    );
    const notContainsLastName = !RegisterForm.containsName(
      password,
      context.parent.lastName
    );
    const containsASpecialChar =
      RegisterForm.containsASpecialCharacter(password);
    const containANumber = RegisterForm.containsANumber(password);

    return (
      atLeast8CharsLong &&
      containsAnUppercaseLetter &&
      containsALowerCaseLetter &&
      notContainsFirstName &&
      notContainsLastName &&
      notContainsEmail &&
      (containsASpecialChar || containANumber)
    );
  }

  public static reachesMinimumLength(password: string | undefined) {
    return (password?.length ?? 0) >= 8;
  }

  public static containsEmail(password: string | undefined, email: string) {
    return (
      email && password?.includes(email.substring(0, email.lastIndexOf('@')))
    );
  }

  public static containsName(password: string | undefined, name: string) {
    return name && password?.includes(name);
  }

  public static containsAnUpperCaseLetter(password: string | undefined) {
    return /[A-Z]/.test(password ?? '');
  }

  public static containsALowerCaseLetter(password: string | undefined) {
    return /[a-z]/.test(password ?? '');
  }

  public static containsASpecialCharacter(password: string | undefined) {
    return '!@#$%^&*()_+-=~`<>{}[]\\|\'?/",.'
      .split('')
      .some((c) => password?.includes(c));
  }

  static containsANumber(password: string | undefined) {
    return /[0-9]/.test(password ?? '');
  }
}
