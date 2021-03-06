import Profile from '@models/api/entities/Profile/Profile';
import PasswordUpdateHistory from '@models/api/entities/Profile/PasswordUpdateHistory/PasswordUpdateHistory';
import admin, { firestore } from './firebase-admin';
import { mapObjectValueRecursivelySync } from '@utils/object-utils';
import LoginHistory from '@models/api/entities/Profile/LoginHistory/LoginHistory';

const convert = <T>(src: FirebaseFirestore.DocumentData): T =>
  mapObjectValueRecursivelySync(src, (value) => {
    if (value instanceof admin.firestore.Timestamp) {
      return value.toDate();
    }
    return value;
  }) as T;

const typeConverter = <T>() => ({
  toFirestore: (data: Partial<T>) => data,
  fromFirestore: (snap: FirebaseFirestore.QueryDocumentSnapshot) =>
    convert<T>(snap.data()),
});

const typedCollection = <T>(collectionPath: string) =>
  firestore.collection(collectionPath).withConverter(typeConverter<T>());

const db = {
  Profile: () => typedCollection<Profile>('profiles'),
  Profile_LoginHistory: (profileId: string) =>
    typedCollection<LoginHistory>(`profiles/${profileId}/login_history`),
  Profile_PasswordUpdateHistory: (profileId: string) =>
    typedCollection<PasswordUpdateHistory>(
      `profiles/${profileId}/password_update_history`
    ),
};

export default db;
