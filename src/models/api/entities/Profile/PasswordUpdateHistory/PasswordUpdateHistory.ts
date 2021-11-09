import FirestoreEntity from '@models/api/entities/FirestoreEntity';

export default class PasswordUpdateHistory implements FirestoreEntity {
  timestamp?: Date | string;
}
