import { Type } from '@common-types';
import { NextApiRequest, NextApiResponse } from 'next';
import { Result, ResultError } from '@utils/api-responses';

import { HttpMethodForbiddenError } from '@models/api/errors/HttpMethodForbiddenError';
import { HttpMethodUnsupportedError } from '@models/api/errors/HttpMethodUnsupportedError';
import { ModelSchemaValidationError } from '@models/api/errors/ModelSchemaValidationError';
import { UserAuthenticationError } from '@models/api/errors/UserAuthenticationError';
import { UserAuthorizationError } from '@models/api/errors/UserAuthorizationError';
import { ResourceNotFoundError } from '@models/api/errors/ResourceNotFoundError';

export type ApiErrorHandler = (
  req: NextApiRequest,
  res: NextApiResponse<Result<unknown>>,
  err: unknown
) => void | Promise<void>;

type ErrorHandlingInfo = {
  errorType: Type<Error>;
  statusCode: number;
  translateKey: string;
  shouldLog: boolean;
};

const ERR_HANDLING_RULES: ErrorHandlingInfo[] = [
  {
    errorType: ResourceNotFoundError,
    statusCode: 404,
    translateKey: 'common:errors.api.not-found',
    shouldLog: false,
  },
  {
    errorType: UserAuthenticationError,
    statusCode: 403,
    translateKey: 'common:errors.api.invalid-user',
    shouldLog: true,
  },
  {
    errorType: UserAuthorizationError,
    statusCode: 403,
    translateKey: 'common:errors.api.unauthorized-user',
    shouldLog: true,
  },
  {
    errorType: ModelSchemaValidationError,
    statusCode: 422,
    translateKey: 'common:errors.api.invalid-schema',
    shouldLog: true,
  },
  {
    errorType: HttpMethodForbiddenError,
    statusCode: 405,
    translateKey: 'common:errors.api.http-not-allowed',
    shouldLog: true,
  },
  {
    errorType: HttpMethodUnsupportedError,
    statusCode: 405,
    translateKey: 'common:errors.api.http-not-supported',
    shouldLog: true,
  },
];

const handleError: ApiErrorHandler = (req, res, err) => {
  for (const rule of ERR_HANDLING_RULES) {
    if (err instanceof rule.errorType) {
      if (rule.shouldLog) {
        console.error(err);
      }
      return res
        .status(rule.statusCode)
        .json(new ResultError(rule.translateKey));
    }
  }
  console.error(err);
  return res.status(500).json(new ResultError('common:errors.api.other'));
};

export default handleError;
