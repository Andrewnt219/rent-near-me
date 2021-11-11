import Profile from '@models/api/entities/Profile/Profile';
import PasswordUpdateHistory from '@models/api/entities/Profile/PasswordUpdateHistory/PasswordUpdateHistory';
import admin, { firestore } from './firebase-admin';
import { mapObjectValueSync } from '@utils/object-utils';

const convert = <T>(src: FirebaseFirestore.DocumentData): T =>
  mapObjectValueSync(src, (value) => {
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
  Profile_PasswordUpdateHistory: (profileId: string) =>
    typedCollection<PasswordUpdateHistory>(
      `profiles/${profileId}/password_update_history`
    ),
};

export default db;
