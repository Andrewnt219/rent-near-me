import { Result, ResultError } from '@utils/api-responses';
import type { NextApiRequest, NextApiResponse } from 'next';

export type NextApiHanlder = (
  req: NextApiRequest,
  res: NextApiResponse<Result>
) => void | Promise<void>;

export type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';
export type HttpMethodHandlers = Partial<Record<HttpMethod, NextApiHanlder>>;
type HttpMethodHandlerSelector = (
  handlers: HttpMethodHandlers
) => NextApiHanlder;

export const handleHttpMethod: HttpMethodHandlerSelector =
  (handlers) => (req, res) => {
    const httpMethod = req.method?.toLowerCase() ?? '';
    if (!(httpMethod in handlers)) {
      return res.status(405).json(new ResultError('HTTP Method Not Allowed'));
    }

    const handle = handlers[httpMethod as HttpMethod];
    if (!handle) {
      return res
        .status(405)
        .json(new ResultError('HTTP Method Not Supported For This Route'));
    }

    try {
      return handle(req, res);
    } catch (err) {
      return handleError(req, res, err);
    }
  };

const handleError = (
  req: NextApiRequest,
  res: NextApiResponse<ResultError>,
  err: unknown
) => {
  console.error(err);
  return res.status(500).json(new ResultError('Oops! Something went wrong.'));
};
