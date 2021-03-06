import type { Await } from '@common-types';
import db from '@libs/firebase-admin/db';
import Profile from '@models/api/entities/Profile/Profile';
import { ResourceNotFoundError } from '@models/api/errors/ResourceNotFoundError';
import {
  ChangeDobFormModel,
  ChangeDobFormSchema,
} from '@modules/account/components/ChangeDobForm/ChangeDobFormModel';
import {
  ChangeFullNameFormModel,
  ChangeFullNameFormSchema,
} from '@modules/account/components/ChangeFullNameForm/ChangeFullNameFormModel';
import {
  ChangeGenderFormModel,
  ChangeGenderFormSchema,
} from '@modules/account/components/ChangeGenderForm/ChangeGenderFormModel';
import { Result, ResultSuccess } from '@utils/api-responses';
import { handleHttpMethod } from '@utils/api/http-method-handler';
import { validateModelWithSchema } from '@utils/api/model-schema-validator';
import { validateUserWithId } from '@utils/api/user-validator';
import { parseModelSync } from '@utils/model-parser';
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

type PatcchResponseData = Await<void>;
export type ApiResult_User_Profile_PATCH = ResultSuccess<PatcchResponseData>;
async function patch(
  req: NextApiRequest,
  res: NextApiResponse<Result<GetResponseData>>
) {
  const uid = req.query['uid'] as string;
  await validateUserWithId(req.headers.authorization, uid, true);

  const model = parseModelSync<Profile>(req.body);
  const mergeFields: (keyof Profile)[] = [];

  if (model.firstName || model.lastName) {
    await validateModelWithSchema(
      model as ChangeFullNameFormModel,
      ChangeFullNameFormSchema(),
      true
    );
    mergeFields.push('firstName', 'lastName');
  }

  if (model.gender) {
    await validateModelWithSchema(
      model as ChangeGenderFormModel,
      ChangeGenderFormSchema(),
      true
    );
    mergeFields.push('gender');
  }

  if (model.dob) {
    await validateModelWithSchema(
      model as ChangeDobFormModel,
      ChangeDobFormSchema(),
      true
    );
    mergeFields.push('dob');
  }

  await db.Profile().doc(uid).set(model, { mergeFields });
  return res.json(new ResultSuccess(null));
}

export default handleHttpMethod({ get, patch });
