import { FirestoreTimestamp } from '@common-types';
import FirestoreEntity from '@models/api/entities/FirestoreEntity';

export default class Profile implements FirestoreEntity {
  firstName?: string;
  lastName?: string;
  gender?: string;
  dob?: Date;
  passwordLastUpdatedTime?: FirestoreTimestamp;
}
