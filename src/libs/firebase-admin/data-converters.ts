import * as admin from 'firebase-admin';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function convertObject(src: any): any {
  if (src instanceof admin.firestore.Timestamp) {
    return src.toDate();
  }
  if (typeof src === 'object' && src !== null) {
    if (Array.isArray(src)) {
      return src.map((elem) => convertObject(elem));
    } else {
      return Object.fromEntries(
        Object.entries(src).map(([key, val]) => [key, convertObject(val)])
      );
    }
  }
  return src;
}

const convert = <T>(src: FirebaseFirestore.DocumentData): T =>
  convertObject(src) as T;

export default convert;
