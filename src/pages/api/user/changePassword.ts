import type { Await } from '@common-types';
import { auth, db } from '@libs/firebase-admin/firebase-admin';
import {
  ChangePasswordFormSchema,
  ChangePasswordFormModel,
} from '@modules/account/components/ChangePasswordForm/ChangePasswordFormModel';
import { Result, ResultSuccess } from '@utils/api-responses';
import { handleHttpMethod } from '@utils/api/http-method-handler';
import { validateModelWithSchema } from '@utils/api/model-schema-validator';
import { validateUserWithId } from '@utils/api/user-validator';
import { parseModelSync } from '@utils/model-parser';
import type { NextApiRequest, NextApiResponse } from 'next';

type PostResponseData = Await<null>;
export type ApiResult_User_ChangePassword_POST =
  ResultSuccess<PostResponseData>;
async function post(
  req: NextApiRequest,
  res: NextApiResponse<Result<PostResponseData>>
) {
  const model = parseModelSync<ChangePasswordFormModel>(req.body);
  await validateModelWithSchema(model, ChangePasswordFormSchema(), true);
  await validateUserWithId(req.headers.authorization, model.uid, true);

  await auth.updateUser(model.uid, { password: model.newPassword });

  const now = new Date();
  await db
    .Profile()
    .doc(model.uid)
    .set({ passwordLastUpdatedTime: now }, { merge: true });
  await db
    .Profile_PasswordUpdateHistory(model.uid)
    // More info may be desired here in the future
    .add({ timestamp: now });
  return res.json(new ResultSuccess(null));
}

export default handleHttpMethod({ post });
