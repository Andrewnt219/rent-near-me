import { ResultSuccess, ResultError, Result } from '@utils/api-responses';
import { handleHttpMethod } from '@utils/api/http-method-handler';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  hello: string;
};

function get(req: NextApiRequest, res: NextApiResponse<Result<Data>>) {
  return res.json(new ResultSuccess({ hello: 'Welcome to RentNearMe' }));
}

export default handleHttpMethod({ get });
