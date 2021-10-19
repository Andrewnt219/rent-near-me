import type { Await } from '@common-types';
import { auth, db } from '@libs/firebase-admin/firebase-admin';
import ChangePasswordFormModel from '@modules/account/components/ChangePasswordForm/ChangePasswordFormModel';
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
  const model = new ChangePasswordFormModel(req.body);
  await validateModelWithSchema(model, ChangePasswordFormModel);
  await validateUserWithId(req.headers.authorization, model.uid);

  await auth.updateUser(model.uid, { password: model.newPassword });

  const userProfileDoc = db.collection('profiles').doc(model.uid);
  const firestoreTimestamp = admin.firestore.FieldValue.serverTimestamp();
  await userProfileDoc.set(
    { passwordLastUpdatedTime: firestoreTimestamp },
    { merge: true }
  );
  await userProfileDoc
    .collection('password_update_history')
    .add({ timestamp: firestoreTimestamp }); // More info may be desired here in the future
  return res.json(new ResultSuccess(null));
}

export default handleHttpMethod({ post });