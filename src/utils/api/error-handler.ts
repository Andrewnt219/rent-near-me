import { Type } from '@common-types';
import { Result, ResultError } from '@utils/api-responses';
import { NextApiRequest, NextApiResponse } from 'next';
import {
  ForbiddenHttpMethodError,
  UnsupportedHttpMethodError,
} from './http-method-handler';
import { ModelSchemaValidationError } from './model-schema-validator';
import {
  UserAuthenticationError,
  UserAuthorizationError,
} from './user-validator';

export type ApiErrorHandler = (
  req: NextApiRequest,
  res: NextApiResponse<Result<unknown>>,
  err: unknown
) => void | Promise<void>;

type ErrorHandlingInfo = {
  errorType: Type<Error>;
  statusCode: number;
  translateKey: string;
};

const ERR_HANDLING_RULES: ErrorHandlingInfo[] = [
  {
    errorType: UserAuthenticationError,
    statusCode: 403,
    translateKey: 'common:errors.api.invalid-user',
  },
  {
    errorType: UserAuthorizationError,
    statusCode: 403,
    translateKey: 'common:errors.api.unauthorized-user',
  },
  {
    errorType: ModelSchemaValidationError,
    statusCode: 422,
    translateKey: 'common:errors.api.invalid-schema',
  },
  {
    errorType: ForbiddenHttpMethodError,
    statusCode: 405,
    translateKey: 'common:errors.api.http-not-allowed',
  },
  {
    errorType: UnsupportedHttpMethodError,
    statusCode: 405,
    translateKey: 'common:errors.api.http-not-supported',
  },
];

const handleError: ApiErrorHandler = (req, res, err) => {
  console.error(err);
  for (const rule of ERR_HANDLING_RULES) {
    if (err instanceof rule.errorType) {
      return res
        .status(rule.statusCode)
        .json(new ResultError(rule.translateKey));
    }
  }
  return res.status(500).json(new ResultError('common:errors.api.other'));
};

export default handleError;
