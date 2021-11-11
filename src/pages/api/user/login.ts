import { Await } from '@common-types';
import { Result, ResultSuccess } from '@utils/api-responses';
import { handleHttpMethod } from '@utils/api/http-method-handler';
import { NextApiRequest, NextApiResponse } from 'next';

type PostResponseData = Await<null>;
export type ApiResult_User_Login_POST = ResultSuccess<PostResponseData>;
async function post(
  req: NextApiRequest,
  res: NextApiResponse<Result<PostResponseData>>
) {
  return res.json(new ResultSuccess(null));
}

export default handleHttpMethod({ post });
