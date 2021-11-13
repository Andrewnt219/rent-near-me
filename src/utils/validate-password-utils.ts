import {
  containsALowerCaseLetter,
  containsANumber,
  containsASpecialCharacter,
  containsAnUpperCaseLetter,
  containsWords,
} from './validate-js-utils';
import { extractEmailLocal } from './string-utils';

export function isValidPassword(password: string | undefined | null) {
  if (!password) return false;

  const results = validatePassword(password);

  return Object.values(results).every((value) => value === true);
}

const passwordCriteria = [
  'valid-length',
  'contains-upper-case',
  'contains-special-char-or-number',
  'contains-lower-case',
] as const;
export type PasswordCriteria = typeof passwordCriteria[number];
export function validatePassword(
  password: string
): Record<PasswordCriteria, boolean> {
  return {
    'valid-length': reachesPasswordMinimumLength(password),
    'contains-upper-case': containsAnUpperCaseLetter(password),
    'contains-lower-case': containsALowerCaseLetter(password),
    'contains-special-char-or-number':
      containsANumber(password) || containsASpecialCharacter(password),
  };
}

export function reachesPasswordMinimumLength(string: string) {
  return string.length >= 8;
}

export function containsEmail(string: string, email: string) {
  const emailLocal = extractEmailLocal(email);

  return emailLocal && containsWords(string, [emailLocal]);
}
