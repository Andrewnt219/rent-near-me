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

// Remove the 'Bearer' preffix from Authorization header
const getIdTokenFromAuthHeader = (header: string) => header.substr(6).trim();

export const validateUser = async (authHeader: string | undefined) => {
  if (!authHeader) throw new UserAuthenticationError();
  const idToken = getIdTokenFromAuthHeader(authHeader);
  const decodedToken = await auth.verifyIdToken(idToken, true).catch(() => {
    throw new UserAuthenticationError();
  });
  return decodedToken;
};

export const validateUserWithId = async (
  authHeader: string | undefined,
  matchingUid: string
) => {
  const decodedToken = await validateUser(authHeader);
  if (matchingUid && decodedToken.uid !== matchingUid)
    throw new UserAuthorizationError(decodedToken.uid, decodedToken.email);
  return decodedToken;
};
