import { NextApiHandler } from 'next';
import { Result } from '@utils/api-responses';
import handleError from './error-handler';
import { HttpMethodForbiddenError } from './errors/HttpMethodForbiddenError';
import { HttpMethodUnsupportedError } from './errors/HttpMethodUnsupportedError';

export type ApiHandler = NextApiHandler<Result>;
export type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';
export type HttpMethodHandlers = Partial<Record<HttpMethod, ApiHandler>>;
type HttpMethodHandlerSelector = (handlers: HttpMethodHandlers) => ApiHandler;

export const handleHttpMethod: HttpMethodHandlerSelector =
  (handlers) => async (req, res) => {
    try {
      const httpMethod = req.method?.toLowerCase() ?? '';
      if (!(httpMethod in handlers))
        throw new HttpMethodForbiddenError(httpMethod);

      const method = httpMethod as HttpMethod;
      const handle = handlers[method];
      if (!handle) throw new HttpMethodUnsupportedError(method);

      return await Promise.resolve(handle(req, res));
    } catch (err) {
      return await Promise.resolve(handleError(req, res, err));
    }
  };
