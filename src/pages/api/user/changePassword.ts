import type { Await } from '@common-types';
import { auth, db } from '@libs/firebase-admin/firebase-admin';
import ChangePasswordFormModel from '@modules/account/components/ChangePasswordForm/ChangePasswordFormModel';
import { Result, ResultError, ResultSuccess } from '@utils/api-responses';
import { handleHttpMethod } from '@utils/api/http-method-handler';
import * as admin from 'firebase-admin';
import type { NextApiRequest, NextApiResponse } from 'next';

type PostResponseData = Await<null>;
export type ApiPostResult_User_ChangePassword = ResultSuccess<PostResponseData>;
async function post(
  req: NextApiRequest,
  res: NextApiResponse<Result<PostResponseData>>
) {
  const model = new ChangePasswordFormModel(req.body);
  const isValid = await ChangePasswordFormModel.getValidationSchema().isValid(
    model
  );
  if (!isValid) {
    return res
      .status(422)
      .json(new ResultError('common:errors.api.invalid-schema'));
  }
  const userProfileDoc = db.collection('profiles').doc(model.uid);
  const firestoreTimestamp = admin.firestore.FieldValue.serverTimestamp();
  await userProfileDoc.update({ passwordLastUpdatedTime: firestoreTimestamp });
  await userProfileDoc
    .collection('password_update_history')
    .add({ timestamp: firestoreTimestamp }); // More info may be desired here in the future
  return res.json(new ResultSuccess(null));
}

export default handleHttpMethod({ post });
