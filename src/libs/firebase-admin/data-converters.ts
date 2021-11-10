import * as admin from 'firebase-admin';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function converter(this: any): any {
  if (this instanceof admin.firestore.Timestamp) {
    return this.toDate();
  }
  if (typeof this === 'object' && this !== null) {
    if (Array.isArray(this)) {
      return this.map((elem) => converter.apply(elem));
    } else {
      return Object.fromEntries(
        Object.entries(this).map(([key, val]) => [key, converter.apply(val)])
      );
    }
  }
  return this;
}

export default converter;
