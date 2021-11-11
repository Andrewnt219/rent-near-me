export function isNullOrUndefined(obj: any): obj is null | undefined {
  return obj === null || obj === undefined;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isEmptyString(obj: any): obj is string | null | undefined {
  if (typeof obj === 'string') {
    return obj.trim().length === 0;
  }

  return isNullOrUndefined(obj);
}

export const SPECIAL_CHARS = '!@#$%^&*()_+-=~`<>{}[]\\|\'?/",.';
export function containsASpecialCharacter(string: string) {
  return containsWords(string, SPECIAL_CHARS.split(''));
}

export function containsWords(string: string, badWords: string[]) {
  return badWords
    .map((word) => word.toLowerCase())
    .some((word) => string.toLocaleLowerCase().includes(word));
}

export function containsAnUpperCaseLetter(string: string) {
  return /[A-Z]/.test(string ?? '');
}

export function containsALowerCaseLetter(string: string) {
  return /[a-z]/.test(string ?? '');
}

export function containsANumber(string: string) {
  return /[0-9]/.test(string);
}

export function isLastIndex(array: unknown[], currentIndex: number) {
  return currentIndex === array.length - 1;
}
