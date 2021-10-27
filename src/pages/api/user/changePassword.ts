import type { Await } from '@common-types';
import { auth, db } from '@libs/firebase-admin/firebase-admin';
import * as ChangePasswordForm from '@modules/account/components/ChangePasswordForm/ChangePasswordFormModel';
import { Result, ResultSuccess } from '@utils/api-responses';
import { handleHttpMethod } from '@utils/api/http-method-handler';
import { validateModelWithSchema } from '@utils/api/model-schema-validator';
import { validateUserWithId } from '@utils/api/user-validator';
import * as admin from 'firebase-admin';
import type { NextApiRequest, NextApiResponse } from 'next';

type PostResponseData = Await<null>;
export type ApiPostResult_User_ChangePassword = ResultSuccess<PostResponseData>;
async function post(
  req: NextApiRequest,
  res: NextApiResponse<Result<PostResponseData>>
) {
  const model = req.body as ChangePasswordForm.Model;
  await validateModelWithSchema(model, ChangePasswordForm.Schema());
  await validateUserWithId(req.headers.authorization, model.uid);

  await auth.updateUser(model.uid, { password: model.newPassword });

  const firestoreTimestamp = admin.firestore.FieldValue.serverTimestamp();
  await db
    .Profile()
    .doc(model.uid)
    .set({ passwordLastUpdatedTime: firestoreTimestamp }, { merge: true });
  await db
    .Profile_PasswordUpdateHistory(model.uid)
    // More info may be desired here in the future
    .add({ timestamp: firestoreTimestamp });
  return res.json(new ResultSuccess(null));
}

export default handleHttpMethod({ post });
