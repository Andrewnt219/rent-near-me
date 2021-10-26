import { Type } from '@common-types';
import { NextApiRequest, NextApiResponse } from 'next';
import { Result, ResultError } from '@utils/api-responses';

import { HttpMethodForbiddenError } from '@models/api/errors/HttpMethodForbiddenError';
import { HttpMethodUnsupportedError } from '@models/api/errors/HttpMethodUnsupportedError';
import { ModelSchemaValidationError } from '@models/api/errors/ModelSchemaValidationError';
import { UserAuthenticationError } from '@models/api/errors/UserAuthenticationError';
import { UserAuthorizationError } from '@models/api/errors/UserAuthorizationError';

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
    errorType: HttpMethodForbiddenError,
    statusCode: 405,
    translateKey: 'common:errors.api.http-not-allowed',
  },
  {
    errorType: HttpMethodUnsupportedError,
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
