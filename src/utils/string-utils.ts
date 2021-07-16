export function extractEmailLocal(string: string): string | null {
  // String before "@" is local, string after @ is host
  // "joe@example.com" -> {local: 'joe', host: 'example.com'}
  const matches = string.match(/(?<local>.*)@(?<host>.*)/);

  if (!matches) return null;

  const local = matches.groups?.['local'];
  if (!local) return null;

  return local;
}
