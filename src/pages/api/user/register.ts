import type { Await } from '@common-types';
import { auth, db } from '@libs/firebase-admin/firebase-admin';
import * as RegisterForm from '@modules/user-auth/components/RegisterForm/RegisterFormModel';
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
  const model = req.body as RegisterForm.Model;
  await validateModelWithSchema(model, RegisterForm.Schema());

  const user = await auth.createUser({
    email: model.email,
    password: model.password,
    displayName: capitalizeName(`${model.firstName} ${model.lastName}`),
    emailVerified: false,
    disabled: false,
  });
  await db
    .Profile()
    .doc(user.uid)
    .create({
      firstName: model.firstName,
      lastName: model.lastName,
      gender: model.gender,
      dob: new Date(model.dob),
    });
  return res.json(new ResultSuccess(user));
}

export default handleHttpMethod({ post });
