export class UserAuthorizationError extends Error {
  uid?: string;
  email?: string;

  constructor(uid?: string, email?: string) {
    super('Unauthorized user');
    this.uid = uid;
    this.email = email;
  }
}
