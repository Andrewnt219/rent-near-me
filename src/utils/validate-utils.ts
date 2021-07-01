export function isNullOrUndefined(obj: any): obj is null | undefined {
  return obj === null || obj === undefined;
}

export function isEmptyString(obj: any): obj is string | null | undefined {
  if (typeof obj === 'string') {
    return obj.trim().length === 0;
  }

  return obj === null || obj === undefined;
}

export function isValidDate(date: any): date is Date {
  const castedDate = new Date(date);

  return castedDate instanceof Date && !isNaN(castedDate.getTime());
}
