import type { Await } from '@common-types';
import { capitalize } from 'lodash';
import { auth, db } from '@libs/firebase-admin/firebase-admin';
import {
  RegisterFormSchema,
  RegisterFormModel,
} from '@modules/user-auth/components/RegisterForm/RegisterFormModel';
import { Result, ResultSuccess } from '@utils/api-responses';
import { handleHttpMethod } from '@utils/api/http-method-handler';
import { validateModelWithSchema } from '@utils/api/model-schema-validator';
import { capitalizeName } from '@utils/string-utils';
import type { NextApiRequest, NextApiResponse } from 'next';
import { parseModelSync } from '@utils/model-parser';

type PostResponseData = Await<ReturnType<typeof auth.createUser>>;
export type ApiResult_User_Register_POST = ResultSuccess<PostResponseData>;
async function post(
  req: NextApiRequest,
  res: NextApiResponse<Result<PostResponseData>>
) {
  const model = parseModelSync<RegisterFormModel>(req.body);
  await validateModelWithSchema(model, RegisterFormSchema(), true);

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
      firstName: capitalize(model.firstName),
      lastName: capitalize(model.lastName),
      gender: model.gender,
      dob: model.dob,
    });
  return res.json(new ResultSuccess(user));
}

export default handleHttpMethod({ post });
