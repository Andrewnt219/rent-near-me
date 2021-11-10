import { capitalize } from 'lodash';

export function extractEmailLocal(string: string): string | null {
  // String before "@" is local, string after @ is host
  // "joe@example.com" -> {local: 'joe', host: 'example.com'}
  const matches = string.match(/(?<local>.*)@(?<host>.*)/);

  if (!matches) return null;

  const local = matches.groups?.['local'];
  if (!local) return null;

  return local;
}

export function capitalizeName(fullname: string) {
  return fullname
    .trim()
    .replace(/\s+/, ' ')
    .split(' ')
    .map((name) => capitalize(name))
    .join(' ');
}

export function generateDisplayName(fName: string, lName: string) {
  return capitalizeName(`${fName} ${lName}`);
}

const ISO_DATE_STRING_REGEX =
  /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/;
export const isIsoDateString = (dateStr: string) =>
  ISO_DATE_STRING_REGEX.test(dateStr);

const reMsAjax = /^\/Date\((d|-|.*)\)[/|\\]$/;
export const isMsAjaxDateString = (dateStr: string) => reMsAjax.test(dateStr);

export const isJsonDateString = (dateStr: string) =>
  isIsoDateString(dateStr) || isMsAjaxDateString(dateStr);
