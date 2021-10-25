import { Result, ResultError } from '@utils/api-responses';
import { NextApiRequest, NextApiResponse } from 'next';
import { ModelSchemaValidationError } from './model-schema-validator';
import {
  UserAuthenticationError,
  UserAuthorizationError,
} from './user-validator';

export type ApiErrorHadnler = (
  req: NextApiRequest,
  res: NextApiResponse<Result<unknown>>,
  err: unknown
) => void | Promise<void>;

const handleError: ApiErrorHadnler = (req, res, err) => {
  if (err instanceof UserAuthenticationError) {
    return res
      .status(403)
      .json(new ResultError('common:errors.api.invalid-user'));
  }

  if (err instanceof UserAuthorizationError) {
    return res
      .status(403)
      .json(new ResultError('common:errors.api.unauthorized-user'));
  }

  if (err instanceof ModelSchemaValidationError) {
    return res
      .status(422)
      .json(new ResultError('common:errors.api.invalid-schema'));
  }

  console.error(err);
  return res.status(500).json(new ResultError('common:errors.api.other'));
};

export default handleError;
