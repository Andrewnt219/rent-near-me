import type { Await } from '@common-types';
import { db } from '@libs/firebase-admin/firebase-admin';
import Profile from '@models/api/entities/Profile/Profile';
import { ResourceNotFoundError } from '@models/api/errors/ResourceNotFoundError';
import { Result, ResultSuccess } from '@utils/api-responses';
import { handleHttpMethod } from '@utils/api/http-method-handler';
import { validateUserWithId } from '@utils/api/user-validator';
import type { NextApiRequest, NextApiResponse } from 'next';

type GetResponseData = Await<Profile>;
export type ApiResult_User_Profile_GET = ResultSuccess<GetResponseData>;
async function get(
  req: NextApiRequest,
  res: NextApiResponse<Result<GetResponseData>>
) {
  const uid = req.query['uid'] as string;

  const profileSnapshot = await db.Profile().doc(uid).get();
  const profile = profileSnapshot.data();
  if (!profileSnapshot.exists || !profile) throw new ResourceNotFoundError();

  if (await validateUserWithId(req.headers.authorization, uid)) {
    // Return full profile
    return res.json(new ResultSuccess(profile));
  }

  // Return public profile
  const publicFields = Profile.DEFAULT_PUBLIC_FIELDS.concat(
    profile.publicFields ?? []
  );
  const publicProfile = Object.fromEntries(
    Object.entries(profile).filter(([key]) => publicFields.includes(key))
  );

  return res.json(new ResultSuccess(publicProfile));
}

export default handleHttpMethod({ get });
