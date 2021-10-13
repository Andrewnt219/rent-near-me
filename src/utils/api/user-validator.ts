import { auth } from '@libs/firebase-admin/firebase-admin';

export class UserAuthenticationError extends Error {
  constructor(message?: string) {
    super(message);
  }
}

export class UserAuthorizationError extends Error {
  uid?: string;
  email?: string;

  constructor(uid?: string, email?: string) {
    super('Unauthorized user');
    this.uid = uid;
    this.email = email;
  }
}

export const validateUser = async (authHeader: string | undefined) => {
  if (!authHeader) throw new UserAuthenticationError();
  // Remove the 'Bearer' preffix from Authorization header
  const idToken = authHeader.substr(6).trim();
  const decodedToken = await auth.verifyIdToken(idToken).catch(() => {
    console.log(idToken);
    throw new UserAuthenticationError();
  });
  return decodedToken;
};

export const validateUserWithId = async (
  authHeader: string | undefined,
  matchingUid?: string
) => {
  const decodedToken = await validateUser(authHeader);
  if (matchingUid && decodedToken.uid !== matchingUid)
    throw new UserAuthorizationError(decodedToken.uid, decodedToken.email);
  return decodedToken;
};
