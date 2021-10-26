import { FirestoreTimestamp } from '@common-types';
import FirestoreEntity from '@models/api/entities/FirestoreEntity';

export default class PasswordUpdateHistory implements FirestoreEntity {
  timestamp?: FirestoreTimestamp;
}
