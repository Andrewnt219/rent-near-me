import type { Await } from '@common-types';
import { auth, db } from '@libs/firebase-admin/firebase-admin';
import RegisterFormModel from '@modules/user-auth/components/RegisterForm/RegisterFormModel';
import { Result, ResultSuccess } from '@utils/api-responses';
import { handleHttpMethod } from '@utils/api/http-method-handler';
import { validateModelWithSchema } from '@utils/api/model-schema-validator';
import { capitalizeName } from '@utils/string-utils';
import type { NextApiRequest, NextApiResponse } from 'next';

type PostResponseData = Await<ReturnType<typeof auth.createUser>>;
export type ApiPostResult_User_Register = ResultSuccess<PostResponseData>;
async function post(
  req: NextApiRequest,
  res: NextApiResponse<Result<PostResponseData>>
) {
  const model = new RegisterFormModel(req.body);
  await validateModelWithSchema(model, RegisterFormModel);

  const user = await auth.createUser({
    email: model.email,
    password: model.password,
    displayName: capitalizeName(`${model.firstName} ${model.lastName}`),
    emailVerified: false,
    disabled: false,
  });
  await db.collection('profiles').doc(user.uid).create({
    id: user.uid,
    firstName: model.firstName,
    lastName: model.lastName,
    gender: model.gender,
    dob: model.dob,
  });
  return res.json(new ResultSuccess(user));
}

export default handleHttpMethod({ post });
