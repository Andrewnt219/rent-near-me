import * as admin from 'firebase-admin';

function fromFirebaseTimestampToDate(this: FirebaseFirestore.DocumentData) {
  for (const [key, val] of Object.entries(this)) {
    if (val instanceof admin.firestore.Timestamp) {
      this[key] = val.toDate();
    }
  }
  return this;
}

const converters = [fromFirebaseTimestampToDate];

export default converters;
