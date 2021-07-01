export function isNullOrUndefined(obj: any): obj is null | undefined {
  return obj === null || obj === undefined;
}

export function isValidDate(date: any): date is Date {
  const castedDate = new Date(date);

  return castedDate instanceof Date && !isNaN(castedDate.getTime());
}
