import { Await } from '@common-types';
import db from '@libs/firebase-admin/db';
import { LoginPayload } from '@models/LoginPayload';
import { Result, ResultSuccess } from '@utils/api-responses';
import { handleHttpMethod } from '@utils/api/http-method-handler';
import { validateUserWithId } from '@utils/api/user-validator';
import { parseModelSync } from '@utils/model-parser';
import { NextApiRequest, NextApiResponse } from 'next';
import { getClientIpAddress } from '@utils/api/ip-address-utils';

type PostResponseData = Await<null>;
export type ApiResult_User_Login_POST = ResultSuccess<PostResponseData>;
async function post(
  req: NextApiRequest,
  res: NextApiResponse<Result<PostResponseData>>
) {
  const model = parseModelSync<LoginPayload>(req.body);
  await validateUserWithId(req.headers.authorization, model.uid, true);

  const {
    authProvider,
    browser,
    browserVersion,
    device,
    deviceManufacturer,
    os,
    isFirstLogin,
  } = model;
  await db.Profile_LoginHistory(model.uid).add({
    timestamp: new Date(),
    ipAddress: getClientIpAddress(req),
    authProvider,
    browser,
    browserVersion,
    device,
    deviceManufacturer,
    os,
    isFirstLogin,
  });

  return res.json(new ResultSuccess(null));
}

export default handleHttpMethod({ post });
