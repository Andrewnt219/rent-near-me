import dayjs from 'dayjs';
import CustomParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(CustomParseFormat);

export function parseDate(str: string, format: string): Date | void {
  const parsed = dayjs(str, format);

  if (parsed.isValid()) {
    return parsed.toDate();
  }
}

export function formatDate(date: Date, format: string): string {
  return dayjs(date).format(format);
}
