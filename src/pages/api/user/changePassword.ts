import type { Await } from '@common-types';
import db from '@libs/firebase-admin/db';
import { ChangePasswordPayload } from '@models/ChangePasswordPayload';
import { Result, ResultSuccess } from '@utils/api-responses';
import { handleHttpMethod } from '@utils/api/http-method-handler';
import getClientIpLocation from '@utils/api/user-locator';
import { validateUserWithId } from '@utils/api/user-validator';
import { parseModelSync } from '@utils/model-parser';
import type { NextApiRequest, NextApiResponse } from 'next';
import requestIp from 'request-ip';

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
    ipAddress: requestIp.getClientIp(req) ?? 'Unknown',
    ...getClientIpLocation(req),
    browser,
    browserVersion,
    device,
    deviceManufacturer,
    os,
  });
  return res.json(new ResultSuccess(null));
}

export default handleHttpMethod({ post });
