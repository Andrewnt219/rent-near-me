import { NextApiHandler } from 'next';
import { Result, ResultError } from '@utils/api-responses';

export type ApiHandler = NextApiHandler<Result>;
export type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';
export type HttpMethodHandlers = Partial<Record<HttpMethod, ApiHandler>>;
type HttpMethodHandlerSelector = (handlers: HttpMethodHandlers) => ApiHandler;

export const handleHttpMethod: HttpMethodHandlerSelector =
  (handlers) => async (req, res) => {
    const httpMethod = req.method?.toLowerCase() ?? '';
    if (!(httpMethod in handlers)) {
      return res
        .status(405)
        .json(new ResultError('common:errors.api.http-not-allowed'));
    }

    const handle = handlers[httpMethod as HttpMethod];
    if (!handle) {
      return res
        .status(405)
        .json(new ResultError('common:errors.api.http-not-supported'));
    }

    try {
      return await Promise.resolve(handle(req, res));
    } catch (err) {
      console.error(err);
      return res.status(500).json(new ResultError('common:errors.api.other'));
    }
  };
