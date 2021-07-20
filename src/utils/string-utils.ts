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
