import FirestoreEntity from '@models/api/entities/FirestoreEntity';

export default class Profile implements FirestoreEntity {
  firstName?: string;
  lastName?: string;
  gender?: string;
  dob?: Date | string;
  passwordLastUpdatedTime?: Date | string;
  publicFields?: string[];

  static DEFAULT_PUBLIC_FIELDS = ['firstName', 'lastName'];
}
