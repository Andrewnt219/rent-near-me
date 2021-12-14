export type Locale = `en-us` | 'vi-vn';

export const getLanguageCodeByLocale = (locale: Locale) => locale.split('-')[0];

export const getCountryCodeByLocale = (locale: Locale) => locale.split('-')[1];
