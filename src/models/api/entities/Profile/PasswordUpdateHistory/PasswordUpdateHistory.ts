import FirestoreEntity from '@models/api/entities/FirestoreEntity';

export default class PasswordUpdateHistory implements FirestoreEntity {
  timestamp?: Date;
  ipAddress?: string;
  authProvider?: string;
  browser?: string;
  browserVersion?: string;
  device?: string;
  deviceManufacturer?: string;
  os?: string;
}
