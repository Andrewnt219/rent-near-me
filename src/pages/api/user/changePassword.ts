import type { Await } from '@common-types';
import db from '@libs/firebase-admin/db';
import { ChangePasswordPayload } from '@models/ChangePasswordPayload';
import { Result, ResultSuccess } from '@utils/api-responses';
import { handleHttpMethod } from '@utils/api/http-method-handler';
import { getClientIpAddress } from '@utils/api/ip-address-utils';
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
  const model = parseModelSync<ChangePasswordPayload>(req.body);
  await validateUserWithId(req.headers.authorization, model.uid, true);

  const now = new Date();
  await db
    .Profile()
    .doc(model.uid)
    .set({ passwordLastUpdatedTime: now }, { merge: true });

  const { browser, browserVersion, device, deviceManufacturer, os } = model;
  await db.Profile_PasswordUpdateHistory(model.uid).add({
    timestamp: now,
    ipAddress: getClientIpAddress(req),
    browser,
    browserVersion,
    device,
    deviceManufacturer,
    os,
  });
  return res.json(new ResultSuccess(null));
}

export default handleHttpMethod({ post });
