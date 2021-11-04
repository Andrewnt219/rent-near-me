export const MAXIMUM_DOB = new Date();

export const DATE_TIME_FORMATS = {
  SHORT_DATE: 'DD-MM', // 31-12
  SHORT_DATE_TEXT: 'MMM DD', // Dec 31

  MEDIUM_DATE: 'DD-MM-YYYY', // 31-12-2021
  MEDIUM_DATE_TEXT: 'MMM DD, YYYY', // Dec 31, 2021

  LONG_DATE: 'DD-MMM-YYYY', // 31-Dec-2021
  LONG_DATE_TEXT: 'MMMM DD, YYYY', // December 31, 2021

  EXTRA_LONG_DATE: 'ddd, DD-MM-YYYY', // Fri, 31-12-2021
  EXTRA_LONG_DATE_TEXT: 'dddd, MMMM DD, YYYY', // Friday, December 31, 2021

  DATE_TIME_12H: 'YYYY-MM-DD h:mm a', // 2021-12-31 11:59 PM
  DATE_TIME_12H_TEXT: 'MMMM DD, YYYY - h:mm A', // December 31, 2021 - 11:59 PM

  TIME_12H: 'h:mm A', // 11:59 PM
  TIME_24H: 'HH:mm', // 23:59
};

export const GENDERS = {
  male: 'Male',
  female: 'Female',
  other: 'Other',
  'not-given': 'Prefer not to say',
};
