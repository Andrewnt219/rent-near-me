import type { NextApiRequest, NextApiResponse } from 'next';
import { Await } from '@common-types';
import RegisterForm from '@models/RegisterForm';
import { ResultSuccess, ResultError, Result } from '@utils/api-responses';
import { handleHttpMethod } from '@utils/api/http-method-handler';
import { auth, db } from '@libs/firebase-admin/firebase-admin';
import { capitalizeName } from '@utils/string-utils';

type PostResponseData = Await<ReturnType<typeof auth.createUser>>;
export type ApiPostResult_UserRegister = ResultSuccess<PostResponseData>;
async function post(
  req: NextApiRequest,
  res: NextApiResponse<Result<PostResponseData>>
) {
  const model = new RegisterForm(req.body);
  const isValid = await RegisterForm.getValidationSchema().isValid(model);
  if (!isValid) {
    return res
      .status(422)
      .json(new ResultError('common:errors.api.invalid-schema'));
  }
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
