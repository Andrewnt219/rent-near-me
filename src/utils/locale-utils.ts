export type Language = 'en' | 'vi';

export type Country = 'us' | 'vn';

export type Locale = `${Language}-${Country}`;

export const getLanguageCodeByLocale = (locale: Locale) =>
  locale.split('-')[0] as Language;

export const getCountryCodeByLocale = (locale: Locale) =>
  locale.split('-')[1] as Country;
