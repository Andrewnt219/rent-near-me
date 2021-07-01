import { isValidDate } from '@utils/validate-utils';
import dateFnsFormat from 'date-fns/format';
import dateFnsParse from 'date-fns/parse';

export function parseDate(str: string, format: string): Date | undefined {
  const parsed = dateFnsParse(str, format, new Date());

  return isValidDate(parsed) ? parsed : undefined;
}

export function formatDate(date: number | Date, format: string) {
  return dateFnsFormat(date, format);
}
