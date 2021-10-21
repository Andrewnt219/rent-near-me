import { auth } from '@libs/firebase-admin/firebase-admin';
import { UserAuthenticationError } from '@models/api/errors/UserAuthenticationError';
import { UserAuthorizationError } from '@models/api/errors/UserAuthorizationError';

// Remove the 'Bearer' preffix from Authorization header
const getIdTokenFromAuthHeader = (header: string) => header.substr(6).trim();

export const validateUser = async (
  authHeader: string | undefined,
  throwError = false
) => {
  if (!authHeader) throw new UserAuthenticationError();
  const idToken = getIdTokenFromAuthHeader(authHeader);
  try {
    const decodedToken = await auth.verifyIdToken(idToken, true);
    return decodedToken;
  } catch {
    if (throwError) throw new UserAuthenticationError();
    else return null;
  }
};

export const validateUserWithId = async (
  authHeader: string | undefined,
  matchingUid: string,
  throwError = false
) => {
  const decodedToken = await validateUser(authHeader, throwError);
  if (!decodedToken) return null;

  if (matchingUid && decodedToken.uid !== matchingUid)
    if (throwError)
      throw new UserAuthorizationError(decodedToken.uid, decodedToken.email);
    else return null;
  return decodedToken;
};
